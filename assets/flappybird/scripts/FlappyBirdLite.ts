import { _decorator, Component, EventTouch, Input, Node, Prefab, find, UITransform, EventKeyboard, KeyCode, input, CCInteger, PhysicsSystem2D, Label, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
import { FBird } from './FBird';
import { PoolManager } from '../../scripts/framework/common/PoolManager';
import { ScrollControl } from './ScrollControl';
import { FLevel, FLevelInitParams } from './FLevel';
import { GameBase } from '../../scripts/framework/base/GameBase';
import { FBGlobalData } from './FBGlobalData';
import { GameResult, GameResultInitParams } from './GameResult';
import { FBAction, FBInputType, FBRecordManager } from './FBRecordManager';
import { Countdown } from '../../scripts/framework/common/Countdown';
import { LogManager } from '../../scripts/framework/common/LogManager';
import { Button } from 'cc';

import { GameFi, Address, toNano , TonClient, TonClient4, getHttpV4Endpoint } from '@ton/cocos-sdk';
import { TonConnectUI,  } from '@tonconnect/ui'
import { TelegramWebApp,  } from '../../cocos-telegram-miniapps/scripts/telegram-web';
import { ToolsView } from './ToolsView';

const { ccclass, property } = _decorator;
const  URL_YOU_ASSIGNED_TO_YOUR_APP="https://t.me/birds_li_bot?game=ggg"
export interface TonAddressConfig {
    tonAddress: string,
    jettonAddress?: string;
}

@ccclass('FlappyBirdLite')
export class FlappyBirdLite extends GameBase {
    @property(Prefab)
    birdPrefab: Prefab = null;
    @property(Node)
    birdRoot: Node = null;
    @property(Node)
    touchLayer: Node = null;
    @property(Node)
    startLayer: Node = null;
    @property(Node)
    gameOverLayer: Node = null;
    @property(ScrollControl)
    bgScroll: ScrollControl = null;
    @property(ScrollControl)
    groundScroll: ScrollControl = null;
    @property(FLevel)
    levelMng: FLevel = null;
    @property(CCInteger)
    initMoveSpeed: number = 200;
    @property(CCInteger)
    skyY: number = 360;
    @property(CCInteger)
    groundY: number = -180;
    @property(Label)
    scoreLbl: Label = null;
    @property(Collider2D)
    skyCollider: Collider2D = null;
    @property(Collider2D)
    groundCollider: Collider2D = null;
    @property(GameResult)
    gameResult: GameResult;
    @property(Countdown)
    countdown: Countdown;

    

    private _bird: FBird = null;
    private _touchStarted: boolean = false;
    private _score: number = 0;
    private _nCoin: number = 0;
    private _backServerUrl:string;
    private _client: TonClient4;
     private _jettonWallet: any;
    @property(Button)
    startGameBtn: Button;
    @property(Label)
    connectLabel: Label;
    @property(Label)
    tonBalance: Label;
    @property(Label)
    jettonBalance: Label;
    @property(Node)
    top: Node;
    @property(Node)
    logo: Node;

    @property(ToolsView)
    toolView: ToolsView;

    private _bTonInit: boolean = false;
    private _cocosGameFi: GameFi;
    private _connectUI;
    private _config: any;

    protected onLoad() {
        LogManager.log(`Game:FlappyBird version:${FBGlobalData.VERSION}`);
        this._backServerUrl = "https://95df-103-97-2-193.ngrok-free.app";
         this.initClient();
        TelegramWebApp.Instance.init().then(res => {
            console.log("telegram web app init : ", res.success);
        }).catch(err => { console.error(err); });
        this.toolView.setBackServerUrl(this._backServerUrl);
        fetch(`${this._backServerUrl}/config`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "ngrok-skip-browser-warning":"1"
            },
            method: 'GET'}).then(response => {
            return response.json();
        }).then(value => {
            console.log("config : ", value);
            if (value.ok) {
             const initScense = async ()=>{
                const addressConfig = {
                    tonAddress: value.tokenRecipient,
                    jettonAddress: value.jettonMaster
                } as TonAddressConfig;
                this._config = addressConfig;
                this.toolView.setTonAddressConfig(addressConfig); 
                this._initPhyEnv();
                // this._setPhy2DDebug(true);
        
                await this._initTonUI(addressConfig);
                await this._rigesterEvent()
   
             }

             initScense();
              

            } else {
                console.error('request config failed!');
            }
        });

;
 
    }
    async initClient() {

        this._client = new TonClient4({
            endpoint: await getHttpV4Endpoint({network: 'mainnet'})
        });
    }
    async showJetton(address : Address){ 
        console.log("jettton address : ", this._config.jettonAddress, this._cocosGameFi);
       if(this._cocosGameFi && this._config.jettonAddress){
        console.log("acquire jetton");
        const openJetton =await this._cocosGameFi.assetsSdk.openJetton(Address.parse(this._config.jettonAddress));
        const jettonContent = await openJetton.getContent();
        const message = "jetton name: " + jettonContent.name +"\njetton decimals: " + jettonContent.decimals;
        console.log("jetton", message)
        return message;
       }
    }
    async getBalance() {
        try {
            const jetton = this._cocosGameFi.openJetton(Address.parse(this._config.jettonAddress));
            console.log("jwallet address  : ", Address.parse(this._cocosGameFi.wallet.account.address).toString({testOnly: false, bounceable: false}));
            const jettonWallet = await jetton.getWallet(Address.parse(this._cocosGameFi.wallet.account.address));
            const jettonWalletData = await jettonWallet.getData();

            return jettonWalletData.balance.toString();
        } catch (e) {
            console.error('failed to load balance', e);
            return '0';
        }
    }
    // async getTonBalance() {
    //     try{
    //         const tonWallet = this._cocosGameFi.openTonWallet(Address.parse(this._config.tonAddress));
    //         const tonWalletData = await tonWallet.getData();
    //         return tonWalletData.balance.toString();
    //     }catch(e){
    //         console.error('failed to load balance', e);
    //         return '0';
    //     }
    // }

    async _initTonUI(addressConfig: TonAddressConfig) {

        this.toolView.node.active = false;
        let connector = new TonConnectUI({
            manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json',
            restoreConnection: true,
            actionsConfiguration:{
                twaReturnUrl: URL_YOU_ASSIGNED_TO_YOUR_APP
            }
            
        });
       const  wallets = await connector.getWallets()
       console.log("wallets : ", wallets);
        this._cocosGameFi = await GameFi.create({
            connector: connector,
            network: 'mainnet',
             // where in-game purchases come to
                merchant: {
                    // in-game jetton purchases (FLAP)
                    // use address you got running `assets-cli deploy-jetton`
                    jettonAddress:  addressConfig.jettonAddress  ,
                    // in-game TON purchases
                    // use master wallet address you got running `assets-cli setup-env`
                    tonAddress:  addressConfig.tonAddress
                }

        });
        this._connectUI = this._cocosGameFi.walletConnector;

        const unsubscribeModal = this._connectUI.onModalStateChange(state => {
            console.log("model state changed! : ", state);

            this.updateConnect();
        });

        const unsubscribeConnectUI = this._connectUI.onStatusChange(info => {
            console.log("wallet info status changed : ", info);

            this.updateConnect();
        });

        this._bTonInit = true;
        this.updateConnect();
    }

    public isConnected(): boolean {
        if (!this._connectUI) {
            console.error("ton ui not inited!");
            return false;
        }
        return this._connectUI.connected;
    }

    private updateConnect() {
        if (this.isConnected()) {
            const address = this._connectUI.account.address;
            const add =Address.parseRaw(address);
            this.connectLabel.string = add.toString( {testOnly: true, bounceable: false }).substring(0, 6) + '...';
            // this.jettonBalance.string =  '1';
            //  this.showJetton(add).then(res => {
            //     this.jettonBalance.string = res;
            //  }
            //  ).catch(e => {
            //     console.error("jetton error", e);
            // })
              this.getBalance().then(res => {
                this.jettonBalance.string = res;
                }).catch(e => {
                    console.error("jetton error", e);
                })
                if( this._client){
                 const updateTone=  async  ()=>{
                    const lastSq =await  this._client.getLastBlock();
                    if(lastSq && lastSq.last.seqno){
                     const account =   await  this._client.getAccount(lastSq.last.seqno, add);
                  console.log("account : ", account.account.balance);
                      this.tonBalance.string = ((account.account.balance.coins as any) * 1/1000000000).toFixed(4) + "";
                     }
                    }
                    updateTone()
                }
                
        } else {
            this.connectLabel.string = "Connect";
        }
    }

    public async openModal() {
        if (!this._bTonInit) return;
        console.log("open modal", this.isConnected(), this._connectUI);

        if (this.isConnected()) {
            this._connectUI.disconnect();
        } else {
            this._connectUI.openModal();
        }
    }

    start() {
        this.gameLoaded();
    }

    public gameStartBtnClicked() {
        this.countDownGame();
    }

    countDownGame() {
        this._loadLevel();
        this.startLayer && (this.startLayer.active = true);
        this.gameOverLayer && (this.gameOverLayer.active = false);
        this.startGameBtn.node.active = false;
        this.logo.active = false;
        this.top.active = true;
        if (this.skyCollider) {
            this.skyCollider.on(Contact2DType.BEGIN_CONTACT, this._outofSky, this);
        }
        if (this.groundCollider) {
            this.groundCollider.on(Contact2DType.BEGIN_CONTACT, this._onGround, this);
        }
        if (this.gameResult) {
            this.gameResult.hide();
        }
        if (this.scoreLbl) {
            this.scoreLbl.node.active = false;
        }

        if (this.countdown) {
            this.countdown.run(3, () => {
                this.startGame();
            });
        }
        
        // if (this._isSingleGameMode()) {
            
        // }
    }

    update(deltaTime: number) {
        if (this._isGameRunning) {
            this._updateBird();
            this._updateLevel();
            this._updateScore();
        }

    }

    gameLoaded() {
        this.resetGame(false);
        if (this._bird) {
            this._bird.node.active = false;
        }
        this.startGameBtn.node.active = true;
        this.gameResult.hide();
        this.startLayer.active = false;
        this.gameOverLayer.active = false;
        this.top.active = false;
        this.logo.active = true;
        
    }

    protected onEnable(): void {
        input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
    }
    protected onDisable(): void {
        input.off(Input.EventType.KEY_DOWN, this._onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this._onKeyUp, this);
    }

    private async _rigesterEvent() {
        if (this.touchLayer) {
            this.touchLayer.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
            this.touchLayer.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        }
        if (this.startLayer) {
            // this.startLayer.on(Input.EventType.TOUCH_END, this.startGame, this);
        }
        if (this.gameOverLayer) {
            this.gameOverLayer.on(Input.EventType.TOUCH_END, this.resetGame, this);
        }
    }

    private _loadLevel() {
        if (!this._bird) {
            this._bird = this._createBird();
            this._bird.init(this.skyY, this.groundY);
        } else {
            this._bird.node.active = true;
        }
        let canvas: Node = find('Canvas');
        let b = canvas.getComponent(UITransform);
        this.bgScroll.init(b.width, this.initMoveSpeed);
        this.groundScroll.init(b.width, this.initMoveSpeed);
        this.startLayer && (this.startLayer.active = true);
        this.gameOverLayer && (this.gameOverLayer.active = false);
        let data: FLevelInitParams = {
            screenWidth: b.width,
            initMoveSpeed: this.initMoveSpeed,
            addScoreCb: () => this._addScore(),
            dieCb: () => this._onDead(),
            addCoinCb: () => this._addCoin(),
        }
        this.levelMng.init(data);
    }

    private _createBird(): FBird {
        let bird: FBird = null;
        if (this.birdPrefab) {
            let birdNode: Node = PoolManager.Instance().getNode(this.birdPrefab, this.birdRoot);
            if (birdNode) {
                bird = birdNode.getComponent(FBird);
            }
        }
        return bird;
    }

    private _onTouchStart(event: EventTouch) {
        this._touchStarted = true;
        FBRecordManager.Instance().addRecord(FBAction.TOUCH_DOWN, FBInputType.TOUCH_OR_MOUSE);
    }

    private _onTouchEnd(event: EventTouch) {
        this._touchStarted = false;
        FBRecordManager.Instance().addRecord(FBAction.TOUCH_UP, FBInputType.TOUCH_OR_MOUSE);
    }

    private _onKeyDown(event: EventKeyboard) {
        LogManager.log('onKeyDown', event.keyCode);
        switch (event.keyCode) {
            case KeyCode.SPACE:
                this._touchStarted = true;
                FBRecordManager.Instance().addRecord(FBAction.TOUCH_DOWN, FBInputType.KEYBOARD);
                break;
        }
    }

    private _onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.SPACE:
                this._touchStarted = false;
                FBRecordManager.Instance().addRecord(FBAction.TOUCH_UP, FBInputType.KEYBOARD);
                break;
        }
    }

    private _updateBird() {
        if (this._touchStarted) {
            this._bird.fly();
        } else {
            this._bird.fall();
        }
    }

    private _updateLevel() {
        this.levelMng.onUpdate();
    }

    public onShowTools() {
        this.toolView.node.active = true;
        this.toolView.setGameFi(this._cocosGameFi);
    }

    startGame() {
        this.startLayer && (this.startLayer.active = false);
        this.gameOverLayer && (this.gameOverLayer.active = false);
        this._isGameRunning = true;
        this._score = 0;
        this._nCoin = 0;
        this.bgScroll.setRun(true);
        this.groundScroll.setRun(true);
        this._bird.startFly();
        this.levelMng.run();
        if (this.scoreLbl) {
            this.scoreLbl.node.active = true;
            this.scoreLbl.string = '0';
        }
        FBRecordManager.Instance().recordStart();
    }

    gameOver() {
        FBRecordManager.Instance().recordEnd();
        this.startLayer && (this.startLayer.active = false);
        // this.gameOverLayer && (this.gameOverLayer.active = true);
        this._isGameRunning = false;
        this.bgScroll.setRun(false);
        this.groundScroll.setRun(false);
        this._bird.die();
        this.levelMng.stop();
        if (this.gameResult) {
            let data: GameResultInitParams = {
                score: this._score,
                coin: this._nCoin,
                restartCb: () => this.resetGame(),
                homeCb: () => this.gameLoaded(),
                isShowButtons: true
            }
             this.submitScore(data).then(() => {
            this.gameResult.init(data);
            this.gameResult.show();
             }).catch(e => {
                    console.error("over", e);
                }
            );
        }
    }
    
    async  submitPlayed(endpoint: string, walletAddress: string, score: number, coin: number) {
        return await (await fetch(endpoint, {
            body: JSON.stringify({
                tg_data: (window as any).Telegram.WebApp.initData,
                wallet: walletAddress,
                score,
                coin,
            }),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST',
        })).json();
    }
    private  async submitScore(data: GameResultInitParams) {

        try {
            const playedInfo = await this.submitPlayed(
                `${this._backServerUrl}/played`,
                this._cocosGameFi.walletAddress.toString(),
                data.score,
                data.coin,
            ) as any;

            if (!playedInfo.ok) throw new Error('Unsuccessful');
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    protected _onGameResetCb(data: Record<string, never>): void {
        this.resetGame();
    }

    resetGame(needStart: boolean = true) {
        this.startLayer && (this.startLayer.active = true);
        this.gameOverLayer && (this.gameOverLayer.active = false);
        // this._isGameRunning = true;
        this._score = 0;
        this._nCoin = 0;
        // this.bgScroll.setRun(true);
        // this.groundScroll.setRun(true);
        this._bird?.reset();
        this.levelMng?.reset();
        if (this.gameResult) {
            this.gameResult.hide()
        }
        if (this.scoreLbl) {
            this.scoreLbl.node.active = false;
            this.scoreLbl.string = '0';
        }
        FBRecordManager.Instance().reset();
        if (needStart) {
            if (this.countdown) {
                this.countdown.run(3, () => {
                    this.startGame();
                });
            }
        }
    }

    private _onDead() {
        this.gameOver();
    }

    private _addScore() {
        if (this._isGameRunning) {
            this._score++;
        }
    }

    private _addCoin() {
        if (this._isGameRunning) {
            this._nCoin++;
        }
    }

    private _updateScore() {
        if (this.scoreLbl) {
            // this.scoreLbl.string = this._score.toString();
            this.scoreLbl.string = this._nCoin.toString();
        }
    }

    private _onGround(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this._isGameRunning) {
            this._onDead();
        }
    }

    private _outofSky(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (this._isGameRunning) {
            this._onDead();
        }
    }
}


