System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './LogManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, resources, error, find, AudioSource, director, Singleton, LogManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      error = module.error;
      find = module.find;
      AudioSource = module.AudioSource;
      director = module.director;
    }, function (module) {
      Singleton = module.Singleton;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "dd24be79BNIBrGtYOPyN6+3", "AudioManager", undefined);
      var AudioManager = exports('AudioManager', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(AudioManager, _Singleton);
        function AudioManager() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.musicVolume = void 0;
          _this.soundVolume = void 0;
          _this.audios = void 0;
          _this.currentMusic = void 0;
          _this.musicAs = null;
          _this.effectAs = null;
          _this.musicVolume = 1;
          _this.soundVolume = 1;
          _this.audios = {};
          _this.currentMusic = null;
          return _this;
        }
        var _proto = AudioManager.prototype;
        _proto.initAudio = function initAudio() {
          // this.musicVolume = localStorage.getNumberData(ConstansConfig.SWITCH_MUSIC_KEY,1)
          // this.soundVolume = localStorage.getNumberData(ConstansConfig.SWITCH_SOUND_KEY,1)

          // LogManager.log("this.musicVolume==",this.musicVolume)
          // if(this.isClose()){
          //     cc.audioEngine.stopAllEffects()
          //     cc.audioEngine.stopMusic();
          // }else{
          //     if(this.currentMusic){
          //         this.playMusic(this.currentMusic,true,true)
          //     }
          // }
        }
        /**
         * 播放音乐
         * @param {String} name 音乐名称可通过constants.AUDIO_MUSIC 获取
         * @param {Boolean} loop 是否循环播放
         */;
        _proto.playMusic = function playMusic(name, loop, mutex) {
          this.play(name, loop, true, mutex);
        }

        /**
         * 播放音效
         * @param {String} name 音效名称可通过constants.AUDIO_SOUND 获取
         * @param {Boolean} loop 是否循环播放
         */;
        _proto.playSound = function playSound(name, loop) {
          this.play(name, loop, false, false);
        };
        _proto.play = function play(name, loop, isMusic, mutex) {
          LogManager.log("===this-isClose", this.isClose());
          var self = this;
          var audio = self.audios[name];

          // 手动暂停的 flag 在调用了 playMusic/playSound 后就改变。否则会造成无法播放啦
          if (audio) {
            audio.isManualStop = false;
            self.playClip(name, isMusic, mutex);
          } else {
            var path = 'audios/';
            if (isMusic) {
              path += 'music/';
            } else {
              path += 'sound/';
            }
            var url = path + name;
            resources.load(url, function (err, clip) {
              if (err) {
                error(err.message || err);
                return;
              }
              var info = {
                clip: clip,
                loop: loop,
                isMusic: isMusic
              };
              self.audios[name] = info;
              self.playClip(name, isMusic, mutex);
            });
          }
        };
        _proto.playClip = function playClip(name, isMuisc, mutex) {
          if (!this.musicAs || !this.effectAs) {
            var node = find("AudioManager");
            var ass = node.getComponents(AudioSource);
            this.musicAs = ass[0];
            this.effectAs = ass[1];
            director.addPersistRootNode(node);
          }
          if (!this.musicAs || !this.effectAs) {
            return;
          }
          var as = null;
          if (isMuisc) {
            as = this.musicAs;
            this.currentMusic = name;
          } else {
            as = this.effectAs;
          }
          var info = this.audios[name];
          if (info.clip == as.clip && !as.playing) {
            as.play();
            return;
          } else {
            as.stop();
            as.clip = info.clip;
            as.play();
          }

          // let volume = this.musicVolume;
          // if (!isMuisc) {
          //     volume = this.soundVolume;
          // } 

          // if(this.isClose()){
          //     return 
          // }
          // this.currentMusic = name;
        };

        _proto.getCurrentMusic = function getCurrentMusic() {
          return this.currentMusic;
        };
        _proto.stop = function stop(name) {
          // if (this.audios.hasOwnProperty(name)) {
          //     let audioId = this.audios[name].audioId;
          //     if (typeof (audioId) !== "undefined")
          //         cc.audioEngine.stop(audioId);
          //     this.audios[name].isManualStop = true;
          // }
        };
        _proto.openMusic = function openMusic() {
          // LogManager.log("=this.currentMusic=",this.currentMusic)
          localStorage.setItem('SWITCH_MUSIC_KEY', '1');
          this.musicVolume = 1;
          this.effectAs.volume = this.musicAs.volume = 1;
        };
        _proto.closeMusic = function closeMusic() {
          // cc.audioEngine.pauseMusic()
          // cc.audioEngine.stopAllEffects()
          // localStorage.setItem('SWITCH_MUSIC_KEY',0)
          // this.musicVolume = 0

          this.effectAs.volume = this.musicAs.volume = 0;
        };
        _proto.isClose = function isClose() {
          if (this.musicVolume == 0) {
            return true;
          }
          return false;
        };
        _proto.isOpen = function isOpen() {
          return this.musicAs.volume > 0;
        };
        _proto.changeState = function changeState(name, flag) {
          // let audio = this.audios[name];
          // if (flag && audio.loop && !audio.isManualStop) {
          //     if (typeof audio.audioId === "number") {
          //         if (this.isAudioStarting(audio.audioId)) return;
          //     }

          //     this.playClip(name);
          // } else if (!flag) {
          //     if (typeof audio.audioId === "number") {
          //         if (this.isAudioStarting(audio.audioId)) {
          //             cc.audioEngine.stop(audio.audioId);
          //         }
          //     }
          // }
        };
        _proto.getConfiguration = function getConfiguration(isMusic) {
          var state;
          if (isMusic) {
            state = true; //configuration.getGlobalData('music');
          } else {
            state = true; //configuration.getGlobalData('sound');
          }

          // LogManager.log('Config for [' + (isMusic ? 'Music' : 'Sound') + '] is ' + state);

          return !state || state === 'true' ? true : false;
        }

        /**
         * 判断声音是否处于播放或初始化中（下载中）的状态
         */;
        _proto.isAudioStarting = function isAudioStarting(audioId) {
          var ret = false;
          // if (typeof audioId === 'number') {
          //     let state = cc.audioEngine.getState(audioId);
          //     ret = state === cc.audioEngine.AudioState.PLAYING || state === cc.audioEngine.AudioState.INITIALZING;

          //     // 微信小游戏中cc.audioEngine.getState(audioId)一旦加载就返回2.bug
          //     if (cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME) {
          //         ret = ret || state === cc.audioEngine.AudioState.PAUSED;
          //     }
          // }

          return ret;
        };
        _proto.setVolume = function setVolume(id, volume) {
          // let state = cc.audioEngine.getState(id);
          // LogManager.log('### audioId ' + id + ' state is: ' + state);

          // cc.audioEngine.setVolume(id, volume);
        };
        return AudioManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraFollowTarget2D.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, CCFloat, find, UITransform, v3, math, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      CCFloat = module.CCFloat;
      find = module.find;
      UITransform = module.UITransform;
      v3 = module.v3;
      math = module.math;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "6b353S2Q8xC6ar9OJqailmO", "CameraFollowTarget2D", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var CameraFollowTarget2D = exports('CameraFollowTarget2D', (_dec = ccclass('CameraFollowTarget2D'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(CCFloat), _dec5 = property(CCFloat), _dec6 = property(CCFloat), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CameraFollowTarget2D, _Component);
        function CameraFollowTarget2D() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "cameraNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "targetNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lerpT", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rightBorder", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "moveSpeed", _descriptor5, _assertThisInitialized(_this));
          _this._screenW = 0;
          _this._offX = 0;
          _this._isActive = false;
          _this._checkDisMin = 1;
          return _this;
        }
        var _proto = CameraFollowTarget2D.prototype;
        _proto.start = function start() {
          var canvas = find('Canvas');
          var b = canvas.getComponent(UITransform);
          this._screenW = b.width;
          this._offX = this._screenW * this.rightBorder;
        };
        _proto.update = function update(deltaTime) {
          if (this._isActive) {
            this._following(deltaTime);
          }
        };
        _proto.setTarget = function setTarget(target) {
          this.targetNode = target;
        };
        _proto.run = function run() {
          this._isActive = true;
        };
        _proto.stop = function stop() {
          this._isActive = false;
        };
        _proto._following = function _following(dt) {
          if (this.targetNode && this.cameraNode) {
            var targetPos = this.targetNode.getPosition();
            var followPos = this.cameraNode.getPosition();
            var x = targetPos.x - this._offX;
            // let dis = Vec3.distance(targetPos, followPos);
            var newPos = v3(followPos);
            if (x - followPos.x > this._checkDisMin) {
              newPos.x = math.lerp(followPos.x, x, this.lerpT);
            }
            this.cameraNode.setPosition(newPos);
          }
        };
        return CameraFollowTarget2D;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cameraNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lerpT", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.6;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rightBorder", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.6;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Config.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b6a571omrhPdIf+lSACg8oX", "Config", undefined);
      var config = exports('config', {
        backendUrl: "https://12ff-43-228-227-10.ngrok-free.app"
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Countdown.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, v3, tween, Vec3, Component, LogManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      v3 = module.v3;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "860217ukV5LJoYorarUH7Gl", "Countdown", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Countdown = exports('Countdown', (_dec = ccclass('Countdown'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Countdown, _Component);
        function Countdown() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "numLbl", _descriptor, _assertThisInitialized(_this));
          _this._isRunning = false;
          _this._time = 0;
          _this._timeInterval = 0;
          _this._total = 3;
          _this._timeupCb = null;
          return _this;
        }
        var _proto = Countdown.prototype;
        _proto.update = function update(deltaTime) {
          if (this._isRunning) {
            this._timeInterval += deltaTime;
            if (this._timeInterval > this._total) {
              this._isRunning = false;
              this._timeupCb && this._timeupCb();
            } else if (this._timeInterval > this._time + 1) {
              this._time++;
              this._setTimeNum(this._total - this._time);
            }
          }
        };
        _proto.run = function run(total, cb) {
          LogManager.log('Countdown run');
          this._isRunning = true;
          this._time = 0;
          this._timeInterval = 0;
          this._total = total;
          this._timeupCb = cb;
          this._setTimeNum(total);
        };
        _proto._setTimeNum = function _setTimeNum(time) {
          if (this.numLbl) {
            this.numLbl.string = time.toString();
            var lblNode = this.numLbl.node;
            lblNode.scale = v3(0.1, 0.1);
            var duration = 0.1;
            tween(lblNode).to(duration, {
              scale: new Vec3(1.1, 1.1, 1.1)
            }).to(duration, {
              scale: new Vec3(1, 1, 1)
            }).start();
          }
        };
        return Countdown;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "numLbl", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/debug-view-runtime-control.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Color, Canvas, UITransform, instantiate, Label, RichText, Toggle, Button, director, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Color = module.Color;
      Canvas = module.Canvas;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Label = module.Label;
      RichText = module.RichText;
      Toggle = module.Toggle;
      Button = module.Button;
      director = module.director;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "b2bd1+njXxJxaFY3ymm06WU", "debug-view-runtime-control", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DebugViewRuntimeControl = exports('DebugViewRuntimeControl', (_dec = ccclass('internal.DebugViewRuntimeControl'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DebugViewRuntimeControl, _Component);
        function DebugViewRuntimeControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "compositeModeToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "singleModeToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "EnableAllCompositeModeButton", _descriptor3, _assertThisInitialized(_this));
          _this._single = 0;
          _this.strSingle = ['No Single Debug', 'Vertex Color', 'Vertex Normal', 'Vertex Tangent', 'World Position', 'Vertex Mirror', 'Face Side', 'UV0', 'UV1', 'UV Lightmap', 'Project Depth', 'Linear Depth', 'Fragment Normal', 'Fragment Tangent', 'Fragment Binormal', 'Base Color', 'Diffuse Color', 'Specular Color', 'Transparency', 'Metallic', 'Roughness', 'Specular Intensity', 'IOR', 'Direct Diffuse', 'Direct Specular', 'Direct All', 'Env Diffuse', 'Env Specular', 'Env All', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Fresnel', 'Direct Transmit Diffuse', 'Direct Transmit Specular', 'Env Transmit Diffuse', 'Env Transmit Specular', 'Transmit All', 'Direct Internal Specular', 'Env Internal Specular', 'Internal All', 'Fog'];
          _this.strComposite = ['Direct Diffuse', 'Direct Specular', 'Env Diffuse', 'Env Specular', 'Emissive', 'Light Map', 'Shadow', 'AO', 'Normal Map', 'Fog', 'Tone Mapping', 'Gamma Correction', 'Fresnel', 'Transmit Diffuse', 'Transmit Specular', 'Internal Specular', 'TT'];
          _this.strMisc = ['CSM Layer Coloration', 'Lighting With Albedo'];
          _this.compositeModeToggleList = [];
          _this.singleModeToggleList = [];
          _this.miscModeToggleList = [];
          _this.textComponentList = [];
          _this.labelComponentList = [];
          _this.textContentList = [];
          _this.hideButtonLabel = void 0;
          _this._currentColorIndex = 0;
          _this.strColor = ['<color=#ffffff>', '<color=#000000>', '<color=#ff0000>', '<color=#00ff00>', '<color=#0000ff>'];
          _this.color = [Color.WHITE, Color.BLACK, Color.RED, Color.GREEN, Color.BLUE];
          return _this;
        }
        var _proto = DebugViewRuntimeControl.prototype;
        _proto.start = function start() {
          // get canvas resolution
          var canvas = this.node.parent.getComponent(Canvas);
          if (!canvas) {
            console.error('debug-view-runtime-control should be child of Canvas');
            return;
          }
          var uiTransform = this.node.parent.getComponent(UITransform);
          var halfScreenWidth = uiTransform.width * 0.5;
          var halfScreenHeight = uiTransform.height * 0.5;
          var x = -halfScreenWidth + halfScreenWidth * 0.1,
            y = halfScreenHeight - halfScreenHeight * 0.1;
          var width = 200,
            height = 20;

          // new nodes
          var miscNode = this.node.getChildByName('MiscMode');
          var buttonNode = instantiate(miscNode);
          buttonNode.parent = this.node;
          buttonNode.name = 'Buttons';
          var titleNode = instantiate(miscNode);
          titleNode.parent = this.node;
          titleNode.name = 'Titles';

          // title
          for (var i = 0; i < 2; i++) {
            var newLabel = instantiate(this.EnableAllCompositeModeButton.getChildByName('Label'));
            newLabel.setPosition(x + (i > 0 ? 50 + width * 2 : 150), y, 0.0);
            newLabel.setScale(0.75, 0.75, 0.75);
            newLabel.parent = titleNode;
            var _labelComponent = newLabel.getComponent(Label);
            _labelComponent.string = i ? '----------Composite Mode----------' : '----------Single Mode----------';
            _labelComponent.color = Color.WHITE;
            _labelComponent.overflow = 0;
            this.labelComponentList[this.labelComponentList.length] = _labelComponent;
          }
          y -= height;
          // single
          var currentRow = 0;
          for (var _i = 0; _i < this.strSingle.length; _i++, currentRow++) {
            if (_i === this.strSingle.length >> 1) {
              x += width;
              currentRow = 0;
            }
            var newNode = _i ? instantiate(this.singleModeToggle) : this.singleModeToggle;
            newNode.setPosition(x, y - height * currentRow, 0.0);
            newNode.setScale(0.5, 0.5, 0.5);
            newNode.parent = this.singleModeToggle.parent;
            var textComponent = newNode.getComponentInChildren(RichText);
            textComponent.string = this.strSingle[_i];
            this.textComponentList[this.textComponentList.length] = textComponent;
            this.textContentList[this.textContentList.length] = textComponent.string;
            newNode.on(Toggle.EventType.TOGGLE, this.toggleSingleMode, this);
            this.singleModeToggleList[_i] = newNode;
          }
          x += width;
          // buttons
          this.EnableAllCompositeModeButton.setPosition(x + 15, y, 0.0);
          this.EnableAllCompositeModeButton.setScale(0.5, 0.5, 0.5);
          this.EnableAllCompositeModeButton.on(Button.EventType.CLICK, this.enableAllCompositeMode, this);
          this.EnableAllCompositeModeButton.parent = buttonNode;
          var labelComponent = this.EnableAllCompositeModeButton.getComponentInChildren(Label);
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var changeColorButton = instantiate(this.EnableAllCompositeModeButton);
          changeColorButton.setPosition(x + 90, y, 0.0);
          changeColorButton.setScale(0.5, 0.5, 0.5);
          changeColorButton.on(Button.EventType.CLICK, this.changeTextColor, this);
          changeColorButton.parent = buttonNode;
          labelComponent = changeColorButton.getComponentInChildren(Label);
          labelComponent.string = 'TextColor';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          var HideButton = instantiate(this.EnableAllCompositeModeButton);
          HideButton.setPosition(x + 200, y, 0.0);
          HideButton.setScale(0.5, 0.5, 0.5);
          HideButton.on(Button.EventType.CLICK, this.hideUI, this);
          HideButton.parent = this.node.parent;
          labelComponent = HideButton.getComponentInChildren(Label);
          labelComponent.string = 'Hide UI';
          this.labelComponentList[this.labelComponentList.length] = labelComponent;
          this.hideButtonLabel = labelComponent;

          // misc
          y -= 40;
          for (var _i2 = 0; _i2 < this.strMisc.length; _i2++) {
            var _newNode = instantiate(this.compositeModeToggle);
            _newNode.setPosition(x, y - height * _i2, 0.0);
            _newNode.setScale(0.5, 0.5, 0.5);
            _newNode.parent = miscNode;
            var _textComponent = _newNode.getComponentInChildren(RichText);
            _textComponent.string = this.strMisc[_i2];
            this.textComponentList[this.textComponentList.length] = _textComponent;
            this.textContentList[this.textContentList.length] = _textComponent.string;
            var toggleComponent = _newNode.getComponent(Toggle);
            toggleComponent.isChecked = _i2 ? true : false;
            _newNode.on(Toggle.EventType.TOGGLE, _i2 ? this.toggleLightingWithAlbedo : this.toggleCSMColoration, this);
            this.miscModeToggleList[_i2] = _newNode;
          }

          // composite
          y -= 150;
          for (var _i3 = 0; _i3 < this.strComposite.length; _i3++) {
            var _newNode2 = _i3 ? instantiate(this.compositeModeToggle) : this.compositeModeToggle;
            _newNode2.setPosition(x, y - height * _i3, 0.0);
            _newNode2.setScale(0.5, 0.5, 0.5);
            _newNode2.parent = this.compositeModeToggle.parent;
            var _textComponent2 = _newNode2.getComponentInChildren(RichText);
            _textComponent2.string = this.strComposite[_i3];
            this.textComponentList[this.textComponentList.length] = _textComponent2;
            this.textContentList[this.textContentList.length] = _textComponent2.string;
            _newNode2.on(Toggle.EventType.TOGGLE, this.toggleCompositeMode, this);
            this.compositeModeToggleList[_i3] = _newNode2;
          }
        };
        _proto.isTextMatched = function isTextMatched(textUI, textDescription) {
          var tempText = new String(textUI);
          var findIndex = tempText.search('>');
          if (findIndex === -1) {
            return textUI === textDescription;
          } else {
            tempText = tempText.substr(findIndex + 1);
            tempText = tempText.substr(0, tempText.search('<'));
            return tempText === textDescription;
          }
        };
        _proto.toggleSingleMode = function toggleSingleMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strSingle.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strSingle[i])) {
              debugView.singleMode = i;
            }
          }
        };
        _proto.toggleCompositeMode = function toggleCompositeMode(toggle) {
          var debugView = director.root.debugView;
          var textComponent = toggle.getComponentInChildren(RichText);
          for (var i = 0; i < this.strComposite.length; i++) {
            if (this.isTextMatched(textComponent.string, this.strComposite[i])) {
              debugView.enableCompositeMode(i, toggle.isChecked);
            }
          }
        };
        _proto.toggleLightingWithAlbedo = function toggleLightingWithAlbedo(toggle) {
          var debugView = director.root.debugView;
          debugView.lightingWithAlbedo = toggle.isChecked;
        };
        _proto.toggleCSMColoration = function toggleCSMColoration(toggle) {
          var debugView = director.root.debugView;
          debugView.csmLayerColoration = toggle.isChecked;
        };
        _proto.enableAllCompositeMode = function enableAllCompositeMode(button) {
          var debugView = director.root.debugView;
          debugView.enableAllCompositeMode(true);
          for (var i = 0; i < this.compositeModeToggleList.length; i++) {
            var _toggleComponent = this.compositeModeToggleList[i].getComponent(Toggle);
            _toggleComponent.isChecked = true;
          }
          var toggleComponent = this.miscModeToggleList[0].getComponent(Toggle);
          toggleComponent.isChecked = false;
          debugView.csmLayerColoration = false;
          toggleComponent = this.miscModeToggleList[1].getComponent(Toggle);
          toggleComponent.isChecked = true;
          debugView.lightingWithAlbedo = true;
        };
        _proto.hideUI = function hideUI(button) {
          var titleNode = this.node.getChildByName('Titles');
          var activeValue = !titleNode.active;
          this.singleModeToggleList[0].parent.active = activeValue;
          this.miscModeToggleList[0].parent.active = activeValue;
          this.compositeModeToggleList[0].parent.active = activeValue;
          this.EnableAllCompositeModeButton.parent.active = activeValue;
          titleNode.active = activeValue;
          this.hideButtonLabel.string = activeValue ? 'Hide UI' : 'Show UI';
        };
        _proto.changeTextColor = function changeTextColor(button) {
          this._currentColorIndex++;
          if (this._currentColorIndex >= this.strColor.length) {
            this._currentColorIndex = 0;
          }
          for (var i = 0; i < this.textComponentList.length; i++) {
            this.textComponentList[i].string = this.strColor[this._currentColorIndex] + this.textContentList[i] + '</color>';
          }
          for (var _i4 = 0; _i4 < this.labelComponentList.length; _i4++) {
            this.labelComponentList[_i4].color = this.color[this._currentColorIndex];
          }
        };
        _proto.onLoad = function onLoad() {};
        _proto.update = function update(deltaTime) {};
        return DebugViewRuntimeControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "compositeModeToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "singleModeToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "EnableAllCompositeModeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FBCoin.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, Collider2D, Node, Contact2DType, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Collider2D = module.Collider2D;
      Node = module.Node;
      Contact2DType = module.Contact2DType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "c4b06Z7XXpKBY93RlWADU6J", "FBCoin", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FBCoin = exports('FBCoin', (_dec = ccclass('FBCoin'), _dec2 = property(Collider2D), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FBCoin, _Component);
        function FBCoin() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "collider", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinImg", _descriptor2, _assertThisInitialized(_this));
          _this._onPickCb = null;
          _this._bAlive = true;
          return _this;
        }
        var _proto = FBCoin.prototype;
        _proto.init = function init(data) {
          this._onPickCb = data.onPickCb;
          this.setVisible(true);
          this._bAlive = true;
        };
        _proto.onLoad = function onLoad() {
          if (!this.collider) {
            this.collider = this.node.getComponent(Collider2D);
          }
        };
        _proto.onEnable = function onEnable() {
          this.collider.on(Contact2DType.BEGIN_CONTACT, this._onPick, this);
        };
        _proto.onDisable = function onDisable() {
          this.collider.off(Contact2DType.BEGIN_CONTACT, this._onPick, this);
        };
        _proto._onPick = function _onPick(selfCollider, otherCollider, contact) {
          // LogManager.log('onPick', selfCollider, otherCollider, contact);
          if (this._bAlive) {
            this._onPickCb && this._onPickCb(selfCollider, otherCollider, this);
          }
        };
        _proto.setVisible = function setVisible(isVisible) {
          this.coinImg && (this.coinImg.active = isVisible);
        };
        _createClass(FBCoin, [{
          key: "isAlive",
          set: function set(v) {
            this._bAlive = v;
          }
        }]);
        return FBCoin;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "collider", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "coinImg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FBGlobalData.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b0b3dS4c+1HC42cGFF6jg9f", "FBGlobalData", undefined);
      var FBGlobalData = exports('FBGlobalData', function FBGlobalData() {});
      FBGlobalData.VERSION = '0.0.6';
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FBird.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Animation, CCInteger, v3, AnimationClip, Component, LogManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Animation = module.Animation;
      CCInteger = module.CCInteger;
      v3 = module.v3;
      AnimationClip = module.AnimationClip;
      Component = module.Component;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "740d43uJghOiovcbY/WX0z2", "FBird", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FLY_MODE = /*#__PURE__*/function (FLY_MODE) {
        FLY_MODE[FLY_MODE["MOVE"] = 0] = "MOVE";
        FLY_MODE[FLY_MODE["ACC_ADD"] = 1] = "ACC_ADD";
        FLY_MODE[FLY_MODE["SIMULATE"] = 2] = "SIMULATE";
        return FLY_MODE;
      }(FLY_MODE || {});
      var FBird = exports('FBird', (_dec = ccclass('FBird'), _dec2 = property([SpriteFrame]), _dec3 = property(Animation), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property(CCInteger), _dec7 = property(CCInteger), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FBird, _Component);
        function FBird() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "birdFrames", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "birdAnim", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "upAcc", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "downAcc", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "upSpeedMax", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "downSpeedMax", _descriptor6, _assertThisInitialized(_this));
          _this._curVSpeed = 0;
          _this._isAlive = false;
          _this._isFlying = false;
          _this._skyY = 0;
          _this._groundY = 0;
          _this._flyMode = FLY_MODE.MOVE;
          return _this;
        }
        var _proto = FBird.prototype;
        _proto.onLoad = function onLoad() {};
        _proto.init = function init(skyY, groundY) {
          this._skyY = skyY;
          this._groundY = groundY;
          switch (this._flyMode) {
            case FLY_MODE.MOVE:
              this._curVSpeed = -this.downSpeedMax * 0.8;
              break;
            case FLY_MODE.ACC_ADD:
              this._curVSpeed = 5;
              break;
            case FLY_MODE.SIMULATE:
              this._curVSpeed = 0;
              break;
          }
        };
        _proto.start = function start() {
          this._createFrameClip(); // 不能放在onLoad里，否则无法播放
        };

        _proto.update = function update(deltaTime) {
          if (this._isAlive) {
            switch (this._flyMode) {
              case FLY_MODE.MOVE:
                this._updateNormal(deltaTime);
                break;
              case FLY_MODE.ACC_ADD:
                this._updateAccAdd(deltaTime);
                break;
              case FLY_MODE.SIMULATE:
                this._updateBySimulate(deltaTime);
                break;
            }
          }
        };
        _proto._updateBySimulate = function _updateBySimulate(deltaTime) {
          var preSpeed = this._curVSpeed;
          if (this._isFlying) {
            this._curVSpeed += this.upAcc * deltaTime;
          } else {
            this._curVSpeed -= this.downAcc * deltaTime;
          }
          if (this._curVSpeed > this.upSpeedMax) {
            this._curVSpeed = this.upSpeedMax;
          }
          if (this._curVSpeed < -this.downSpeedMax) {
            this._curVSpeed = -this.downSpeedMax;
          }
          var deltaY = preSpeed * deltaTime + this._curVSpeed * deltaTime * 0.5;
          var pos = v3(this.node.position);
          pos.y += deltaY;
          if (pos.y < this._groundY) {
            pos.y = this._groundY;
          }
          if (pos.y > this._skyY) {
            pos.y = this._skyY;
          }
          this.node.setPosition(pos);
        };
        _proto._updateNormal = function _updateNormal(deltaTime) {
          var pos = v3(this.node.position);
          pos.y += this._curVSpeed * deltaTime;
          if (pos.y < this._groundY) {
            pos.y = this._groundY;
          }
          if (pos.y > this._skyY) {
            pos.y = this._skyY;
          }
          this.node.setPosition(pos);
        };
        _proto._updateAccAdd = function _updateAccAdd(deltaTime) {
          var deltaV = -this.downAcc * deltaTime;
          var deltaY = this._curVSpeed * deltaTime + deltaV * deltaTime * 1;
          this._curVSpeed += deltaV;
          var pos = v3(this.node.position);
          pos.y += deltaY;
          if (pos.y < this._groundY) {
            pos.y = this._groundY;
          }
          if (pos.y > this._skyY) {
            pos.y = this._skyY;
          }
          this.node.setPosition(pos);
        };
        _proto._createFrameClip = function _createFrameClip() {
          var clip = AnimationClip.createWithSpriteFrames(this.birdFrames, this.birdFrames.length);
          clip.name = 'fly';
          // clip.speed = 24;
          clip.wrapMode = AnimationClip.WrapMode.Loop;
          this.birdAnim.addClip(clip);
          // this.birdAnim.defaultClip = clip;
          this.birdAnim.play('fly');
          LogManager.log('create frame clip', this.birdFrames.length);
        };
        _proto.startFly = function startFly() {
          this._isAlive = true;
        };
        _proto.fly = function fly() {
          this._isFlying = true;
          switch (this._flyMode) {
            case FLY_MODE.MOVE:
              {
                var pos = v3(this.node.position);
                pos.y += this.upSpeedMax * 0.03;
                if (pos.y < this._groundY) {
                  pos.y = this._groundY;
                }
                if (pos.y > this._skyY) {
                  pos.y = this._skyY;
                }
                this.node.setPosition(pos);
              }
              break;
            case FLY_MODE.ACC_ADD:
              {
                this._curVSpeed = this.upSpeedMax * 0.1;
              }
              break;
            case FLY_MODE.SIMULATE:
              break;
          }
        };
        _proto.fall = function fall() {
          this._isFlying = false;
        };
        _proto.die = function die() {
          this._isAlive = false;
        };
        _proto.reset = function reset() {
          this.node.setPosition(v3());
          // this._isAlive = true;
          switch (this._flyMode) {
            case FLY_MODE.MOVE:
              this._curVSpeed = -this.downSpeedMax * 0.8;
              break;
            case FLY_MODE.ACC_ADD:
              this._curVSpeed = 0;
              break;
            case FLY_MODE.SIMULATE:
              this._curVSpeed = 0;
              break;
          }
        };
        return FBird;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "birdFrames", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "birdAnim", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "upAcc", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 800;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "downAcc", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "upSpeedMax", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "downSpeedMax", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FBRecordManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './Utils.ts', './FBGlobalData.ts'], function (exports) {
  var _inheritsLoose, cclegacy, Singleton, Utils, FBGlobalData;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      Singleton = module.Singleton;
    }, function (module) {
      Utils = module.Utils;
    }, function (module) {
      FBGlobalData = module.FBGlobalData;
    }],
    execute: function () {
      cclegacy._RF.push({}, "57764XoS/xOk6LJo55L7wcs", "FBRecordManager", undefined);
      var FBAction = exports('FBAction', /*#__PURE__*/function (FBAction) {
        FBAction[FBAction["TOUCH_DOWN"] = 0] = "TOUCH_DOWN";
        FBAction[FBAction["TOUCH_UP"] = 1] = "TOUCH_UP";
        return FBAction;
      }({}));
      var FBInputType = exports('FBInputType', /*#__PURE__*/function (FBInputType) {
        FBInputType[FBInputType["KEYBOARD"] = 0] = "KEYBOARD";
        FBInputType[FBInputType["TOUCH_OR_MOUSE"] = 1] = "TOUCH_OR_MOUSE";
        return FBInputType;
      }({}));
      var FBRecordManager = exports('FBRecordManager', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(FBRecordManager, _Singleton);
        function FBRecordManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Singleton.call.apply(_Singleton, [this].concat(args)) || this;
          _this._record = [];
          _this._startTime = 0;
          _this._endTime = 0;
          return _this;
        }
        var _proto = FBRecordManager.prototype;
        _proto.init = function init() {
          this._record = [];
        };
        _proto.recordStart = function recordStart() {
          this._startTime = Utils.getTimeStamp();
        };
        _proto.recordEnd = function recordEnd() {
          this._endTime = Utils.getTimeStamp();
        };
        _proto.addRecord = function addRecord(act, inputType) {
          var data = {
            timestamp: Utils.getTimeStamp(),
            action: act,
            inputType: inputType
          };
          this._record.push(data);
        };
        _proto.reset = function reset() {
          this._record = [];
          this._startTime = 0;
          this._endTime = 0;
        };
        _proto.getData = function getData() {
          var data = {
            start: this._startTime,
            end: this._endTime,
            version: FBGlobalData.VERSION,
            record: this._record
          };
          return data;
        };
        return FBRecordManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FlappyBirdLite.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './FBird.ts', './PoolManager.ts', './ScrollControl.ts', './FLevel.ts', './GameBase.ts', './FBGlobalData.ts', './GameResult.ts', './FBRecordManager.ts', './Countdown.ts', './LogManager.ts', './index.ts', './index.mjs', './telegram-web.ts', './ToolsView.ts', './Config.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Prefab, Node, CCInteger, Label, Collider2D, Button, Contact2DType, input, Input, find, UITransform, KeyCode, FBird, PoolManager, ScrollControl, FLevel, GameBase, FBGlobalData, GameResult, FBRecordManager, FBAction, FBInputType, Countdown, LogManager, __webpack_exports__Address, __webpack_exports__TonClient4, __webpack_exports__getHttpV4Endpoint, __webpack_exports__GameFi, TonConnectUI, TelegramWebApp, ToolsView, config;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      Node = module.Node;
      CCInteger = module.CCInteger;
      Label = module.Label;
      Collider2D = module.Collider2D;
      Button = module.Button;
      Contact2DType = module.Contact2DType;
      input = module.input;
      Input = module.Input;
      find = module.find;
      UITransform = module.UITransform;
      KeyCode = module.KeyCode;
    }, function (module) {
      FBird = module.FBird;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      ScrollControl = module.ScrollControl;
    }, function (module) {
      FLevel = module.FLevel;
    }, function (module) {
      GameBase = module.GameBase;
    }, function (module) {
      FBGlobalData = module.FBGlobalData;
    }, function (module) {
      GameResult = module.GameResult;
    }, function (module) {
      FBRecordManager = module.FBRecordManager;
      FBAction = module.FBAction;
      FBInputType = module.FBInputType;
    }, function (module) {
      Countdown = module.Countdown;
    }, function (module) {
      LogManager = module.LogManager;
    }, function (module) {
      __webpack_exports__Address = module.Address;
      __webpack_exports__TonClient4 = module.TonClient4;
      __webpack_exports__getHttpV4Endpoint = module.getHttpV4Endpoint;
      __webpack_exports__GameFi = module.GameFi;
    }, function (module) {
      TonConnectUI = module.TonConnectUI;
    }, function (module) {
      TelegramWebApp = module.TelegramWebApp;
    }, function (module) {
      ToolsView = module.ToolsView;
    }, function (module) {
      config = module.config;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23;
      cclegacy._RF.push({}, "005f9OFOEZNWqyXICbdhSjI", "FlappyBirdLite", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var URL_YOU_ASSIGNED_TO_YOUR_APP = "https://t.me/birds_li_bot?game=ggg";
      var FlappyBirdLite = exports('FlappyBirdLite', (_dec = ccclass('FlappyBirdLite'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(ScrollControl), _dec8 = property(ScrollControl), _dec9 = property(FLevel), _dec10 = property(CCInteger), _dec11 = property(CCInteger), _dec12 = property(CCInteger), _dec13 = property(Label), _dec14 = property(Collider2D), _dec15 = property(Collider2D), _dec16 = property(GameResult), _dec17 = property(Countdown), _dec18 = property(Button), _dec19 = property(Label), _dec20 = property(Label), _dec21 = property(Label), _dec22 = property(Node), _dec23 = property(Node), _dec24 = property(ToolsView), _dec(_class = (_class2 = /*#__PURE__*/function (_GameBase) {
        _inheritsLoose(FlappyBirdLite, _GameBase);
        function FlappyBirdLite() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _GameBase.call.apply(_GameBase, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "birdPrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "birdRoot", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "touchLayer", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "startLayer", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameOverLayer", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bgScroll", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "groundScroll", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "levelMng", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "initMoveSpeed", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "skyY", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "groundY", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreLbl", _descriptor12, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "skyCollider", _descriptor13, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "groundCollider", _descriptor14, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gameResult", _descriptor15, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "countdown", _descriptor16, _assertThisInitialized(_this));
          _this._bird = null;
          _this._touchStarted = false;
          _this._score = 0;
          _this._nCoin = 0;
          _this._backServerUrl = void 0;
          _this._client = void 0;
          _this._jettonWallet = void 0;
          _initializerDefineProperty(_this, "startGameBtn", _descriptor17, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "connectLabel", _descriptor18, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tonBalance", _descriptor19, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "jettonBalance", _descriptor20, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "top", _descriptor21, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "logo", _descriptor22, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toolView", _descriptor23, _assertThisInitialized(_this));
          _this._bTonInit = false;
          _this._cocosGameFi = void 0;
          _this._connectUI = void 0;
          _this._config = void 0;
          return _this;
        }
        var _proto = FlappyBirdLite.prototype;
        _proto.onLoad = function onLoad() {
          var _this2 = this;
          LogManager.log("Game:FlappyBird version:" + FBGlobalData.VERSION);
          this._backServerUrl = config.backendUrl;
          this.initClient();
          TelegramWebApp.Instance.init().then(function (res) {
            console.log("telegram web app init : ", res.success);
          })["catch"](function (err) {
            console.error(err);
          });
          this.toolView.setBackServerUrl(this._backServerUrl);
          fetch(this._backServerUrl + "/config", {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "ngrok-skip-browser-warning": "1"
            },
            method: 'GET'
          }).then(function (response) {
            return response.json();
          }).then(function (value) {
            console.log("config : ", value);
            if (value.ok) {
              var initScense = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                  var addressConfig;
                  return _regeneratorRuntime().wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        addressConfig = {
                          tonAddress: value.tokenRecipient,
                          jettonAddress: value.jettonMaster
                        };
                        _this2._config = addressConfig;
                        _this2.toolView.setTonAddressConfig(addressConfig);
                        _this2._initPhyEnv();
                        // this._setPhy2DDebug(true);
                        _context.next = 6;
                        return _this2._initTonUI(addressConfig);
                      case 6:
                        _context.next = 8;
                        return _this2._rigesterEvent();
                      case 8:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function initScense() {
                  return _ref.apply(this, arguments);
                };
              }();
              initScense();
            } else {
              console.error('request config failed!');
            }
          });
        };
        _proto.initClient = /*#__PURE__*/function () {
          var _initClient = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.t0 = __webpack_exports__TonClient4;
                  _context2.next = 3;
                  return __webpack_exports__getHttpV4Endpoint({
                    network: 'mainnet'
                  });
                case 3:
                  _context2.t1 = _context2.sent;
                  _context2.t2 = {
                    endpoint: _context2.t1
                  };
                  this._client = new _context2.t0(_context2.t2);
                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function initClient() {
            return _initClient.apply(this, arguments);
          }
          return initClient;
        }();
        _proto.showJetton = /*#__PURE__*/function () {
          var _showJetton = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(address) {
            var openJetton, jettonContent, message;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  console.log("jettton address : ", this._config.jettonAddress, this._cocosGameFi);
                  if (!(this._cocosGameFi && this._config.jettonAddress)) {
                    _context3.next = 12;
                    break;
                  }
                  console.log("acquire jetton");
                  _context3.next = 5;
                  return this._cocosGameFi.assetsSdk.openJetton(__webpack_exports__Address.parse(this._config.jettonAddress));
                case 5:
                  openJetton = _context3.sent;
                  _context3.next = 8;
                  return openJetton.getContent();
                case 8:
                  jettonContent = _context3.sent;
                  message = "jetton name: " + jettonContent.name + "\njetton decimals: " + jettonContent.decimals;
                  console.log("jetton", message);
                  return _context3.abrupt("return", message);
                case 12:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function showJetton(_x) {
            return _showJetton.apply(this, arguments);
          }
          return showJetton;
        }();
        _proto.getBalance = /*#__PURE__*/function () {
          var _getBalance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var jetton, jettonWallet, jettonWalletData;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  jetton = this._cocosGameFi.openJetton(__webpack_exports__Address.parse(this._config.jettonAddress));
                  console.log("jwallet address  : ", __webpack_exports__Address.parse(this._cocosGameFi.wallet.account.address).toString({
                    testOnly: false,
                    bounceable: false
                  }));
                  _context4.next = 5;
                  return jetton.getWallet(__webpack_exports__Address.parse(this._cocosGameFi.wallet.account.address));
                case 5:
                  jettonWallet = _context4.sent;
                  _context4.next = 8;
                  return jettonWallet.getData();
                case 8:
                  jettonWalletData = _context4.sent;
                  return _context4.abrupt("return", jettonWalletData.balance.toString());
                case 12:
                  _context4.prev = 12;
                  _context4.t0 = _context4["catch"](0);
                  console.error('failed to load balance', _context4.t0);
                  return _context4.abrupt("return", '0');
                case 16:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this, [[0, 12]]);
          }));
          function getBalance() {
            return _getBalance.apply(this, arguments);
          }
          return getBalance;
        }() // async getTonBalance() {
        //     try{
        //         const tonWallet = this._cocosGameFi.openTonWallet(Address.parse(this._config.tonAddress));
        //         const tonWalletData = await tonWallet.getData();
        //         return tonWalletData.balance.toString();
        //     }catch(e){
        //         console.error('failed to load balance', e);
        //         return '0';
        //     }
        // }
        ;

        _proto._initTonUI = /*#__PURE__*/
        function () {
          var _initTonUI2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(addressConfig) {
            var _this3 = this;
            var connector, wallets;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  this.toolView.node.active = false;
                  connector = new TonConnectUI({
                    manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json',
                    restoreConnection: true,
                    actionsConfiguration: {
                      twaReturnUrl: URL_YOU_ASSIGNED_TO_YOUR_APP
                    }
                  });
                  _context5.next = 4;
                  return connector.getWallets();
                case 4:
                  wallets = _context5.sent;
                  console.log("wallets : ", wallets);
                  _context5.next = 8;
                  return __webpack_exports__GameFi.create({
                    connector: connector,
                    network: 'mainnet',
                    // where in-game purchases come to
                    merchant: {
                      // in-game jetton purchases (FLAP)
                      // use address you got running `assets-cli deploy-jetton`
                      jettonAddress: addressConfig.jettonAddress,
                      // in-game TON purchases
                      // use master wallet address you got running `assets-cli setup-env`
                      tonAddress: addressConfig.tonAddress
                    }
                  });
                case 8:
                  this._cocosGameFi = _context5.sent;
                  this._connectUI = this._cocosGameFi.walletConnector;
                  this._connectUI.onModalStateChange(function (state) {
                    console.log("model state changed! : ", state);
                    _this3.updateConnect();
                  });
                  this._connectUI.onStatusChange(function (info) {
                    console.log("wallet info status changed : ", info);
                    _this3.updateConnect();
                  });
                  this._bTonInit = true;
                  this.updateConnect();
                case 14:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function _initTonUI(_x2) {
            return _initTonUI2.apply(this, arguments);
          }
          return _initTonUI;
        }();
        _proto.isConnected = function isConnected() {
          if (!this._connectUI) {
            console.error("ton ui not inited!");
            return false;
          }
          return this._connectUI.connected;
        };
        _proto.updateConnect = function updateConnect() {
          var _this4 = this;
          if (this.isConnected()) {
            var address = this._connectUI.account.address;
            var add = __webpack_exports__Address.parseRaw(address);
            this.connectLabel.string = add.toString({
              testOnly: true,
              bounceable: false
            }).substring(0, 6) + '...';
            // this.jettonBalance.string =  '1';
            //  this.showJetton(add).then(res => {
            //     this.jettonBalance.string = res;
            //  }
            //  ).catch(e => {
            //     console.error("jetton error", e);
            // })
            this.getBalance().then(function (res) {
              _this4.jettonBalance.string = res;
            })["catch"](function (e) {
              console.error("jetton error", e);
            });
            if (this._client) {
              var updateTone = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
                  var lastSq, account;
                  return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                    while (1) switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return _this4._client.getLastBlock();
                      case 2:
                        lastSq = _context6.sent;
                        if (!(lastSq && lastSq.last.seqno)) {
                          _context6.next = 9;
                          break;
                        }
                        _context6.next = 6;
                        return _this4._client.getAccount(lastSq.last.seqno, add);
                      case 6:
                        account = _context6.sent;
                        console.log("account : ", account.account.balance);
                        _this4.tonBalance.string = (account.account.balance.coins * 1 / 1000000000).toFixed(4) + "";
                      case 9:
                      case "end":
                        return _context6.stop();
                    }
                  }, _callee6);
                }));
                return function updateTone() {
                  return _ref2.apply(this, arguments);
                };
              }();
              updateTone();
            }
          } else {
            this.connectLabel.string = "Connect";
          }
        };
        _proto.openModal = /*#__PURE__*/function () {
          var _openModal = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  if (this._bTonInit) {
                    _context7.next = 2;
                    break;
                  }
                  return _context7.abrupt("return");
                case 2:
                  console.log("open modal", this.isConnected(), this._connectUI);
                  if (this.isConnected()) {
                    this._connectUI.disconnect();
                  } else {
                    this._connectUI.openModal();
                  }
                case 4:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function openModal() {
            return _openModal.apply(this, arguments);
          }
          return openModal;
        }();
        _proto.start = function start() {
          this.gameLoaded();
        };
        _proto.gameStartBtnClicked = function gameStartBtnClicked() {
          this.countDownGame();
        };
        _proto.countDownGame = function countDownGame() {
          var _this5 = this;
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
            this.countdown.run(3, function () {
              _this5.startGame();
            });
          }

          // if (this._isSingleGameMode()) {

          // }
        };

        _proto.update = function update(deltaTime) {
          if (this._isGameRunning) {
            this._updateBird();
            this._updateLevel();
            this._updateScore();
          }
        };
        _proto.gameLoaded = function gameLoaded() {
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
        };
        _proto.onEnable = function onEnable() {
          input.on(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this._onKeyUp, this);
        };
        _proto.onDisable = function onDisable() {
          input.off(Input.EventType.KEY_DOWN, this._onKeyDown, this);
          input.off(Input.EventType.KEY_UP, this._onKeyUp, this);
        };
        _proto._rigesterEvent = /*#__PURE__*/function () {
          var _rigesterEvent2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  if (this.touchLayer) {
                    this.touchLayer.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
                    this.touchLayer.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
                  }
                  if (this.startLayer) ;
                  if (this.gameOverLayer) {
                    this.gameOverLayer.on(Input.EventType.TOUCH_END, this.resetGame, this);
                  }
                case 3:
                case "end":
                  return _context8.stop();
              }
            }, _callee8, this);
          }));
          function _rigesterEvent() {
            return _rigesterEvent2.apply(this, arguments);
          }
          return _rigesterEvent;
        }();
        _proto._loadLevel = function _loadLevel() {
          var _this6 = this;
          if (!this._bird) {
            this._bird = this._createBird();
            this._bird.init(this.skyY, this.groundY);
          } else {
            this._bird.node.active = true;
          }
          var canvas = find('Canvas');
          var b = canvas.getComponent(UITransform);
          this.bgScroll.init(b.width, this.initMoveSpeed);
          this.groundScroll.init(b.width, this.initMoveSpeed);
          this.startLayer && (this.startLayer.active = true);
          this.gameOverLayer && (this.gameOverLayer.active = false);
          var data = {
            screenWidth: b.width,
            initMoveSpeed: this.initMoveSpeed,
            addScoreCb: function addScoreCb() {
              return _this6._addScore();
            },
            dieCb: function dieCb() {
              return _this6._onDead();
            },
            addCoinCb: function addCoinCb() {
              return _this6._addCoin();
            }
          };
          this.levelMng.init(data);
        };
        _proto._createBird = function _createBird() {
          var bird = null;
          if (this.birdPrefab) {
            var birdNode = PoolManager.Instance().getNode(this.birdPrefab, this.birdRoot);
            if (birdNode) {
              bird = birdNode.getComponent(FBird);
            }
          }
          return bird;
        };
        _proto._onTouchStart = function _onTouchStart(event) {
          this._touchStarted = true;
          FBRecordManager.Instance().addRecord(FBAction.TOUCH_DOWN, FBInputType.TOUCH_OR_MOUSE);
        };
        _proto._onTouchEnd = function _onTouchEnd(event) {
          this._touchStarted = false;
          FBRecordManager.Instance().addRecord(FBAction.TOUCH_UP, FBInputType.TOUCH_OR_MOUSE);
        };
        _proto._onKeyDown = function _onKeyDown(event) {
          LogManager.log('onKeyDown', event.keyCode);
          switch (event.keyCode) {
            case KeyCode.SPACE:
              this._touchStarted = true;
              FBRecordManager.Instance().addRecord(FBAction.TOUCH_DOWN, FBInputType.KEYBOARD);
              break;
          }
        };
        _proto._onKeyUp = function _onKeyUp(event) {
          switch (event.keyCode) {
            case KeyCode.SPACE:
              this._touchStarted = false;
              FBRecordManager.Instance().addRecord(FBAction.TOUCH_UP, FBInputType.KEYBOARD);
              break;
          }
        };
        _proto._updateBird = function _updateBird() {
          if (this._touchStarted) {
            this._bird.fly();
          } else {
            this._bird.fall();
          }
        };
        _proto._updateLevel = function _updateLevel() {
          this.levelMng.onUpdate();
        };
        _proto.onShowTools = function onShowTools() {
          this.toolView.node.active = true;
          this.toolView.setGameFi(this._cocosGameFi);
        };
        _proto.startGame = function startGame() {
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
        };
        _proto.gameOver = function gameOver() {
          var _this7 = this;
          FBRecordManager.Instance().recordEnd();
          this.startLayer && (this.startLayer.active = false);
          // this.gameOverLayer && (this.gameOverLayer.active = true);
          this._isGameRunning = false;
          this.bgScroll.setRun(false);
          this.groundScroll.setRun(false);
          this._bird.die();
          this.levelMng.stop();
          if (this.gameResult) {
            var data = {
              score: this._score,
              coin: this._nCoin,
              restartCb: function restartCb() {
                return _this7.resetGame();
              },
              homeCb: function homeCb() {
                return _this7.gameLoaded();
              },
              isShowButtons: true
            };
            this.submitScore(data).then(function () {
              _this7.gameResult.init(data);
              _this7.gameResult.show();
            })["catch"](function (e) {
              console.error("over", e);
            });
          }
        };
        _proto.submitPlayed = /*#__PURE__*/function () {
          var _submitPlayed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(endpoint, walletAddress, score, coin) {
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  _context9.next = 2;
                  return fetch(endpoint, {
                    body: JSON.stringify({
                      tg_data: window.Telegram.WebApp.initData,
                      wallet: walletAddress,
                      score: score,
                      coin: coin
                    }),
                    headers: {
                      'content-type': 'application/json'
                    },
                    method: 'POST'
                  });
                case 2:
                  _context9.next = 4;
                  return _context9.sent.json();
                case 4:
                  return _context9.abrupt("return", _context9.sent);
                case 5:
                case "end":
                  return _context9.stop();
              }
            }, _callee9);
          }));
          function submitPlayed(_x3, _x4, _x5, _x6) {
            return _submitPlayed.apply(this, arguments);
          }
          return submitPlayed;
        }();
        _proto.submitScore = /*#__PURE__*/function () {
          var _submitScore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data) {
            var playedInfo;
            return _regeneratorRuntime().wrap(function _callee10$(_context10) {
              while (1) switch (_context10.prev = _context10.next) {
                case 0:
                  _context10.prev = 0;
                  _context10.next = 3;
                  return this.submitPlayed(this._backServerUrl + "/played", this._cocosGameFi.walletAddress.toString(), data.score, data.coin);
                case 3:
                  playedInfo = _context10.sent;
                  if (playedInfo.ok) {
                    _context10.next = 6;
                    break;
                  }
                  throw new Error('Unsuccessful');
                case 6:
                  _context10.next = 12;
                  break;
                case 8:
                  _context10.prev = 8;
                  _context10.t0 = _context10["catch"](0);
                  console.error(_context10.t0);
                  throw _context10.t0;
                case 12:
                case "end":
                  return _context10.stop();
              }
            }, _callee10, this, [[0, 8]]);
          }));
          function submitScore(_x7) {
            return _submitScore.apply(this, arguments);
          }
          return submitScore;
        }();
        _proto._onGameResetCb = function _onGameResetCb(data) {
          this.resetGame();
        };
        _proto.resetGame = function resetGame(needStart) {
          var _this$_bird,
            _this$levelMng,
            _this8 = this;
          if (needStart === void 0) {
            needStart = true;
          }
          this.startLayer && (this.startLayer.active = true);
          this.gameOverLayer && (this.gameOverLayer.active = false);
          // this._isGameRunning = true;
          this._score = 0;
          this._nCoin = 0;
          // this.bgScroll.setRun(true);
          // this.groundScroll.setRun(true);
          (_this$_bird = this._bird) == null || _this$_bird.reset();
          (_this$levelMng = this.levelMng) == null || _this$levelMng.reset();
          if (this.gameResult) {
            this.gameResult.hide();
          }
          if (this.scoreLbl) {
            this.scoreLbl.node.active = false;
            this.scoreLbl.string = '0';
          }
          FBRecordManager.Instance().reset();
          if (needStart) {
            if (this.countdown) {
              this.countdown.run(3, function () {
                _this8.startGame();
              });
            }
          }
        };
        _proto._onDead = function _onDead() {
          this.gameOver();
        };
        _proto._addScore = function _addScore() {
          if (this._isGameRunning) {
            this._score++;
          }
        };
        _proto._addCoin = function _addCoin() {
          if (this._isGameRunning) {
            this._nCoin++;
          }
        };
        _proto._updateScore = function _updateScore() {
          if (this.scoreLbl) {
            // this.scoreLbl.string = this._score.toString();
            this.scoreLbl.string = this._nCoin.toString();
          }
        };
        _proto._onGround = function _onGround(selfCollider, otherCollider, contact) {
          if (this._isGameRunning) {
            this._onDead();
          }
        };
        _proto._outofSky = function _outofSky(selfCollider, otherCollider, contact) {
          if (this._isGameRunning) {
            this._onDead();
          }
        };
        return FlappyBirdLite;
      }(GameBase), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "birdPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "birdRoot", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "touchLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "startLayer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "gameOverLayer", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bgScroll", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "groundScroll", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "levelMng", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "initMoveSpeed", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "skyY", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 360;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "groundY", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -180;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "scoreLbl", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "skyCollider", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "groundCollider", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "gameResult", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "countdown", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "startGameBtn", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "connectLabel", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "tonBalance", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "jettonBalance", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "top", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "logo", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "toolView", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FLevel.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './PoolManager.ts', './FPipe.ts', './FBCoin.ts', './LogManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, CCInteger, Node, v3, Component, PoolManager, FPipe, FBCoin, LogManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      CCInteger = module.CCInteger;
      Node = module.Node;
      v3 = module.v3;
      Component = module.Component;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      FPipe = module.FPipe;
    }, function (module) {
      FBCoin = module.FBCoin;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "32a55jmdvlOooDKZhIyjy0R", "FLevel", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FLevel = exports('FLevel', (_dec = ccclass('FLevel'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(CCInteger), _dec9 = property(CCInteger), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FLevel, _Component);
        function FLevel() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "pipePrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinPrefab", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "pipeSpace", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinSpace", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "step1", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "step2", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "yMin", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "yMax", _descriptor8, _assertThisInitialized(_this));
          _this._isRunning = false;
          _this._dieCb = null;
          _this._addScoreCb = null;
          _this._screenW = 0;
          _this._screenLeft = 0;
          _this._screenRight = 0;
          _this._initMoveSpeed = 0;
          _this._curMoveSpeed = 0;
          _this._subCount = 0;
          _this._subLen = 0;
          _this._pipes1 = [];
          _this._pipes2 = [];
          _this._coins1 = [];
          _this._coins2 = [];
          _this._addCoinCb = null;
          return _this;
        }
        var _proto = FLevel.prototype;
        _proto.init = function init(data) {
          this._screenW = data.screenWidth;
          this._screenRight = Math.floor(data.screenWidth * 0.5);
          this._screenLeft = -this._screenRight;
          this._initMoveSpeed = data.initMoveSpeed;
          this._curMoveSpeed = data.initMoveSpeed;
          this._subCount = Math.ceil(data.screenWidth / this.pipeSpace);
          this._subLen = this._subCount * this.pipeSpace;
          this._dieCb = data.dieCb;
          this._addScoreCb = data.addScoreCb;
          this._addCoinCb = data.addCoinCb;
        };
        _proto.run = function run() {
          this._isRunning = true;
          var x = this._screenRight;
          var pos1 = this.step1.position;
          this.step1.setPosition(x, pos1.y);
          this._pipes1 = this._createStepPipes(this.step1, this._subCount);
          this._coins1 = this._createStepCoins(this.step1, this._subCount * 3);
          x += this._subLen;
          var pos2 = this.step2.position;
          this.step2.setPosition(x, pos2.y);
          this._pipes2 = this._createStepPipes(this.step2, this._subCount);
          this._coins2 = this._createStepCoins(this.step2, this._subCount * 3);
        };
        _proto.stop = function stop() {
          this._isRunning = false;
          for (var i = 0; i < this._pipes1.length; ++i) {
            var pipe = this._pipes1[i].getComponent(FPipe);
            pipe.setActive(false);
          }
          for (var _i = 0; _i < this._pipes2.length; ++_i) {
            var _pipe = this._pipes2[_i].getComponent(FPipe);
            _pipe.setActive(false);
          }
        };
        _proto.reset = function reset() {
          for (var i = 0; i < this._pipes1.length; ++i) {
            PoolManager.Instance().putNode(this._pipes1[i]);
          }
          for (var _i2 = 0; _i2 < this._pipes2.length; ++_i2) {
            PoolManager.Instance().putNode(this._pipes2[_i2]);
          }
          for (var _i3 = 0; _i3 < this._coins1.length; ++_i3) {
            PoolManager.Instance().putNode(this._coins1[_i3]);
          }
          for (var _i4 = 0; _i4 < this._coins2.length; ++_i4) {
            PoolManager.Instance().putNode(this._coins2[_i4]);
          }
          // this.run();
        };

        _proto.setSpeed = function setSpeed(v) {
          this._curMoveSpeed = v;
        };
        _proto.onUpdate = function onUpdate() {};
        _proto.update = function update(dt) {
          if (this._isRunning) {
            var pos1 = v3(this.step1.position);
            pos1.x -= this._initMoveSpeed * dt;
            this.step1.setPosition(pos1);
            var pos2 = v3(this.step2.position);
            pos2.x -= this._initMoveSpeed * dt;
            this.step2.setPosition(pos2);
            if (pos2.x < this._screenLeft) {
              for (var i = 0; i < this._pipes1.length; ++i) {
                PoolManager.Instance().putNode(this._pipes1[i]);
              }
              this._pipes1 = this._pipes2;
              var step = this.step1;
              this.step1 = this.step2;
              this.step2 = step;
              var x = this.step1.position.x + this._subLen;
              LogManager.log('switch step', "step1:" + this.step1.name + ",step2:" + this.step2.name, this.step1.position.x, x);
              this.step2.setPosition(x, pos1.y);
              this._pipes2 = this._createStepPipes(this.step2, this._subCount);
              // coins
              for (var _i5 = 0; _i5 < this._coins1.length; ++_i5) {
                PoolManager.Instance().putNode(this._coins1[_i5]);
              }
              this._coins1 = this._coins2;
              this._coins2 = this._createStepCoins(this.step2, this._subCount * 3);
            }
          }
        };
        _proto._createStepPipes = function _createStepPipes(rootNode, count) {
          var _this2 = this;
          var pipes = [];
          var x = 0;
          var h = this.yMax - this.yMin;
          for (var i = 0; i < count; ++i) {
            var pipe = PoolManager.Instance().getNode(this.pipePrefab, rootNode);
            var y = this.yMin + Math.random() * h;
            pipe.setPosition(x, y);
            pipes.push(pipe);
            x += this.pipeSpace;
            var script = pipe.getComponent(FPipe);
            if (script) {
              script.init(function () {
                return _this2._dieCb && _this2._dieCb();
              }, function () {
                return _this2._addScoreCb && _this2._addScoreCb();
              });
            }
          }
          return pipes;
        };
        _proto._createStepCoins = function _createStepCoins(rootNode, count) {
          var _this3 = this;
          var coins = [];
          var x = this.coinSpace;
          var h = this.yMax - this.yMin;
          for (var i = 0; i < count; ++i) {
            var coin = PoolManager.Instance().getNode(this.coinPrefab, rootNode);
            var y = this.yMin + Math.random() * h;
            coin.setPosition(x, y);
            coin.active = true;
            coins.push(coin);
            x += this.coinSpace;
            if (x % this.pipeSpace == 0) {
              x += this.coinSpace;
            }
            var script = coin.getComponent(FBCoin);
            if (script) {
              var data = {
                onPickCb: function onPickCb(selfCollider, otherCollider, self) {
                  LogManager.log('onPickCb', selfCollider, otherCollider);
                  self.setVisible(false);
                  self.isAlive = false;
                  _this3._addCoinCb();
                }
              };
              script.init(data);
            }
          }
          return coins;
        };
        return FLevel;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pipePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "coinPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pipeSpace", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 400;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "coinSpace", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "step1", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "step2", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "yMin", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -100;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "yMax", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FollowTarget.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, CCBoolean, CCFloat, v3, math, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      CCBoolean = module.CCBoolean;
      CCFloat = module.CCFloat;
      v3 = module.v3;
      math = module.math;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "d40c9/uOEpFtKbZHduop+YG", "FollowTarget", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FollowTarget = exports('FollowTarget', (_dec = ccclass('FollowTarget'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(CCBoolean), _dec5 = property(CCBoolean), _dec6 = property(CCBoolean), _dec7 = property(CCFloat), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FollowTarget, _Component);
        function FollowTarget() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "followNode", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "targetNode", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "enableX", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "enableY", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "enableZ", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lerpT", _descriptor6, _assertThisInitialized(_this));
          _this._isActive = false;
          _this._checkDisMin = 2;
          return _this;
        }
        var _proto = FollowTarget.prototype;
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {
          if (this._isActive) {
            this._following(deltaTime);
          }
        };
        _proto.setTarget = function setTarget(target) {
          this.targetNode = target;
        };
        _proto.run = function run() {
          this._isActive = true;
        };
        _proto.stop = function stop() {
          this._isActive = false;
        };
        _proto._following = function _following(dt) {
          if (this.targetNode && this.followNode) {
            var targetPos = this.targetNode.getPosition();
            var followPos = this.followNode.getPosition();
            // let dis = Vec3.distance(targetPos, followPos);
            var newPos = v3(followPos);
            if (this.enableX) {
              if (Math.abs(followPos.x - targetPos.x) > this._checkDisMin) {
                newPos.x = math.lerp(followPos.x, targetPos.x, this.lerpT);
              }
            }
            if (this.enableY) {
              if (Math.abs(followPos.y - targetPos.y) > this._checkDisMin) {
                newPos.y = math.lerp(followPos.y, targetPos.y, this.lerpT);
              }
            }
            if (this.enableZ) {
              if (Math.abs(followPos.z - targetPos.z) > this._checkDisMin) {
                newPos.z = math.lerp(followPos.z, targetPos.z, this.lerpT);
              }
            }
            this.followNode.setPosition(newPos);
          }
        };
        return FollowTarget;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "followNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "targetNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enableX", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "enableY", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "enableZ", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lerpT", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.6;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FPipe.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Collider2D, Contact2DType, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Collider2D = module.Collider2D;
      Contact2DType = module.Contact2DType;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "48700V2l71LcYyJAegf728u", "FPipe", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FPipe = exports('FPipe', (_dec = ccclass('FPipe'), _dec2 = property(Collider2D), _dec3 = property(Collider2D), _dec4 = property(Collider2D), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FPipe, _Component);
        function FPipe() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "dieUpArea", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "dieDownArea", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "passArea", _descriptor3, _assertThisInitialized(_this));
          _this._onDieCb = null;
          _this._onPassCb = null;
          _this._bActive = false;
          return _this;
        }
        var _proto = FPipe.prototype;
        _proto.setActive = function setActive(isActive) {
          this._bActive = isActive;
        };
        _proto.start = function start() {
          if (this.dieUpArea) {
            this.dieUpArea.on(Contact2DType.BEGIN_CONTACT, this._onDie, this);
          }
          if (this.dieDownArea) {
            this.dieDownArea.on(Contact2DType.BEGIN_CONTACT, this._onDie, this);
          }
          if (this.passArea) {
            this.passArea.on(Contact2DType.END_CONTACT, this._onPass, this);
          }
        };
        _proto.removeColliderListener = function removeColliderListener() {
          if (this.dieUpArea) {
            this.dieUpArea.off(Contact2DType.BEGIN_CONTACT, this._onDie, this);
          }
          if (this.dieDownArea) {
            this.dieDownArea.off(Contact2DType.BEGIN_CONTACT, this._onDie, this);
          }
          if (this.passArea) {
            this.passArea.off(Contact2DType.END_CONTACT, this._onPass, this);
          }
        };
        _proto.init = function init(dieCb, passCb) {
          this._onDieCb = dieCb;
          this._onPassCb = passCb;
          this._bActive = true;
        };
        _proto._onDie = function _onDie(selfCollider, otherCollider, contact) {
          this._bActive && this._onDieCb && this._onDieCb();
        };
        _proto._onPass = function _onPass(selfCollider, otherCollider, contact) {
          this._bActive && this._onPassCb && this._onPassCb();
        };
        return FPipe;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "dieUpArea", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dieDownArea", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "passArea", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameBase.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, PhysicsSystem2D, EPhysics2DDrawFlags, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      PhysicsSystem2D = module.PhysicsSystem2D;
      EPhysics2DDrawFlags = module.EPhysics2DDrawFlags;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "c3c3a8b/JVAja1JIHZB0kx5", "GameBase", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameBase = exports('GameBase', (_dec = ccclass('GameBase'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameBase, _Component);
        function GameBase() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this._isGameRunning = false;
          _this._isLoadingProgress = 0;
          return _this;
        }
        var _proto = GameBase.prototype;
        _proto._initPhyEnv = function _initPhyEnv() {
          // https://docs.cocos.com/creator/manual/zh/physics-2d/physics-2d-system.html
          PhysicsSystem2D.instance.enable = true;
          // PhysicsSystem2D.instance.gravity = v2();
          // PhysicsSystem2D.instance.gravity = v2(0, -20 * PHYSICS_2D_PTM_RATIO);
        };

        _proto._setPhy2DDebug = function _setPhy2DDebug(active) {
          if (active) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb | EPhysics2DDrawFlags.Pair | EPhysics2DDrawFlags.CenterOfMass | EPhysics2DDrawFlags.Joint | EPhysics2DDrawFlags.Shape;
          } else {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None;
          }
        };
        return GameBase;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameResult.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './telegram-web.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Node, Label, Component, TelegramWebApp;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Component = module.Component;
    }, function (module) {
      TelegramWebApp = module.TelegramWebApp;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "05e7ePf3KtHTJDIs/UNRAlj", "GameResult", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameResult = exports('GameResult', (_dec = ccclass('GameResult'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameResult, _Component);
        function GameResult() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "center", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreLbl", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinLbl", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buttons", _descriptor4, _assertThisInitialized(_this));
          _this._restartCb = void 0;
          _this._homeCb = void 0;
          return _this;
        }
        var _proto = GameResult.prototype;
        _proto.init = function init(data) {
          if (this.scoreLbl) {
            this.scoreLbl.string = Math.floor(+data.score).toString();
          }
          if (this.coinLbl) {
            this.coinLbl.string = Math.floor(+data.coin).toString();
          }
          this._restartCb = data.restartCb;
          this._homeCb = data.homeCb;
          if (this.buttons) {
            this.buttons.active = data.isShowButtons;
          }
        };
        _proto.show = function show() {
          this.node.active = true;
          this.center.active = true;
        };
        _proto.hide = function hide() {
          this.node.active = false;
        };
        _proto.onRestart = function onRestart() {
          this._restartCb && this._restartCb();
        };
        _proto.onShare = function onShare() {
          TelegramWebApp.Instance.share("https://t.me/birds_li_bot/game", "Invite you to play a very interesting game");
        };
        _proto.gotoHomePage = function gotoHomePage() {
          this._homeCb && this._homeCb();
        };
        return GameResult;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "center", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreLbl", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "coinLbl", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "buttons", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GlobalEvent.ts", ['cc', './LogManager.ts'], function (exports) {
  var cclegacy, LogManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "54a1b+57SRJQ7ZzPtgFt8Yq", "GlobalEvent", undefined);
      var GlobalEvent = /*#__PURE__*/function () {
        function GlobalEvent() {
          this.handles_ = {};
        } //LogManager.log("=GlobalEvent==")
        var _proto = GlobalEvent.prototype;
        _proto.emit = function emit(eventName, data) {
          data = data || {};
          data.eventName = eventName;
          var event_list = this.handles_[eventName];
          if (event_list) {
            for (var i = 0; i < event_list.length; i++) {
              var item = event_list[i];
              if (item && item.callback) {
                item.callback(data);
              }
            }
          }
        };
        _proto.on = function on(eventName, callback, target) {
          var event_list = this.handles_[eventName];
          if (event_list) {
            for (var i = 0; i < event_list.length; i++) {
              var _item = event_list[i];
              if (_item.target == target) {
                LogManager.log("===alread exist target");
                return;
              }
            }
          }
          var item = {};
          item.target = target;
          item.callback = callback.bind(target);
          this.handles_[eventName] = this.handles_[eventName] || [];
          this.handles_[eventName].push(item);
        };
        _proto.off = function off(eventName, target) {
          var event_list = this.handles_[eventName];
          var length = event_list.length;
          for (var i = length - 1; i >= 0; i--) {
            var item = event_list[i];
            if (item) {
              if (item.target == target) {
                event_list.splice(i, 1);
              }
            }
          }
        };
        _proto.offAll = function offAll(eventName) {
          this.handles_[eventName] = null;
        };
        _proto.offAllByTarget = function offAllByTarget(target) {
          var self = this;
          Object.keys(this.handles_).forEach(function (key) {
            var event_list = self.handles_[key];
            for (var i = event_list.length - 1; i >= 0; i--) {
              var item = event_list[i];
              if (item) {
                if (item.target == target) {
                  //LogManager.log("this.handles_==!!!!=")
                  event_list.splice(i, 1);
                }
              }
            }
          });

          //LogManager.log("this.handles_===",this.handles_)
        };

        return GlobalEvent;
      }();
      var globalEvent = exports('default', new GlobalEvent());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LogManager.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2b325zMl7pNbLAHRP4dWQor", "LogManager", undefined);
      var LogManager = exports('LogManager', /*#__PURE__*/function () {
        function LogManager() {}
        LogManager.log = function log() {
          var _console;
          (_console = console).log.apply(_console, arguments);
        };
        return LogManager;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./debug-view-runtime-control.ts', './telegram-web.ts', './Config.ts', './FBCoin.ts', './FBGlobalData.ts', './FBRecordManager.ts', './FBird.ts', './FLevel.ts', './FPipe.ts', './FlappyBirdLite.ts', './GameResult.ts', './ResolutionAdjuster.ts', './ScrollControl.ts', './ToolsView.ts', './Main.ts', './GameBase.ts', './CameraFollowTarget2D.ts', './Countdown.ts', './FollowTarget.ts', './LogManager.ts', './PoolManager.ts', './Singleton.ts', './Utils.ts', './GlobalEvent.ts', './AudioManager.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _inheritsLoose, cclegacy, _decorator, Component;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "2f1a6Ng4LZOi5EYJ+Y3VFQd", "Main", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var Main = exports('Main', (_dec = ccclass('Main'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Main, _Component);
        function Main() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = Main.prototype;
        _proto.start = function start() {};
        _proto.update = function update(deltaTime) {};
        return Main;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PoolManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Singleton.ts', './LogManager.ts'], function (exports) {
  var _inheritsLoose, cclegacy, instantiate, NodePool, Singleton, LogManager;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }, function (module) {
      Singleton = module.Singleton;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fc96dkimfdB2o00UvukH8oT", "PoolManager", undefined);
      var PoolManager = exports('PoolManager', /*#__PURE__*/function (_Singleton) {
        _inheritsLoose(PoolManager, _Singleton);
        function PoolManager() {
          var _this;
          _this = _Singleton.call(this) || this;
          _this.exclusion_dict = void 0;
          _this.dictPool = void 0;
          _this.dictPool = {};
          _this.exclusion_dict = {};
          return _this;
        }
        var _proto = PoolManager.prototype;
        _proto.start = function start() {};
        _proto.getNode = function getNode(prefab, parent, is_exclusion) {
          if (parent === void 0) {
            parent = null;
          }
          if (is_exclusion === void 0) {
            is_exclusion = false;
          }
          var name = prefab.name;
          if (is_exclusion) {
            if (this.exclusion_dict[name]) {
              return;
            } else {
              for (var key in this.exclusion_dict) {
                this.putNode(this.exclusion_dict[key]);
                delete this.exclusion_dict[key];
              }
            }
          }
          var node = null;
          if (this.dictPool.hasOwnProperty(name)) {
            var pool = this.dictPool[name];
            if (pool.size() > 0) {
              node = pool.get();
            } else {
              node = instantiate(prefab);
            }
          } else {
            var _pool = new NodePool();
            this.dictPool[name] = _pool;
            node = instantiate(prefab);
          }
          if (is_exclusion) {
            this.exclusion_dict[name] = node;
          }
          if (node == null) {
            LogManager.log('>>>>>name,', name);
            LogManager.log('>>>>>prefab,', prefab);
            LogManager.log('>>>>>this.dictPool[name],', this.dictPool[name]);
          }
          if (parent != null) {
            parent.addChild(node);
          }
          return node;
        };
        _proto.putNode = function putNode(node) {
          var name = node.name;
          if (this.exclusion_dict[name]) {
            delete this.exclusion_dict[name];
          }
          var pool = null;
          if (this.dictPool.hasOwnProperty(name)) {
            pool = this.dictPool[name];
          } else {
            pool = new NodePool();
            this.dictPool[name] = pool;
          }
          pool.put(node);
        };
        _proto.clearPool = function clearPool(name) {
          if (this.dictPool.hasOwnProperty(name)) {
            var pool = this.dictPool[name];
            pool.clear();
          }
        };
        return PoolManager;
      }(Singleton));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ResolutionAdjuster.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCInteger, CCBoolean, View, ResolutionPolicy, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      CCBoolean = module.CCBoolean;
      View = module.View;
      ResolutionPolicy = module.ResolutionPolicy;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "b7cf84Lo3lKQaTeZjg7KYPu", "ResolutionAdjuster", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ResolutionAdjuster = exports('ResolutionAdjuster', (_dec = ccclass('ResolutionAdjuster'), _dec2 = property(CCInteger), _dec3 = property(CCInteger), _dec4 = property(CCInteger), _dec5 = property(CCInteger), _dec6 = property(CCBoolean), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ResolutionAdjuster, _Component);
        function ResolutionAdjuster() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "fixedWidthDesignWidth", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fixedWidthDesignHeight", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fixedHeightDesignWidth", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "fixedHeightDesignHeight", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "isAutoFit", _descriptor5, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = ResolutionAdjuster.prototype;
        _proto.onLoad = function onLoad() {
          if (this.isAutoFit) {
            this.autoFit();
            window.addEventListener('resize', this.autoFit.bind(this));
            // Screen.on('orientation-change', this.autoFit.bind(this));
          }
        };

        _proto.start = function start() {
          if (this.isAutoFit) {
            this.autoFit();
          }
        };
        _proto.autoFit = function autoFit() {
          var designSize = View.instance.getDesignResolutionSize();
          // console.log(`desginSize = ${designSize}`);

          // let visibleSize = View.instance.getVisibleSize();
          // console.log(`visibleSize = ${visibleSize}`);

          var viewPortRect = View.instance.getViewportRect();
          View.instance.setOrientation;
          console.log("viewPortRect = " + viewPortRect);
          var rateR = designSize.height / designSize.width;
          var rateV = Math.abs(viewPortRect.size.height) / Math.abs(viewPortRect.size.width);

          // let rp = ResolutionPolicy.FIXED_HEIGHT;
          // if (rateV < 1.0)
          // {
          //     rp = ResolutionPolicy.FIXED_WIDTH;
          // }

          console.log("rateV = " + rateV);
          if (rateV < 1.0) {
            View.instance.setDesignResolutionSize(this.fixedWidthDesignWidth, this.fixedWidthDesignHeight, ResolutionPolicy.FIXED_WIDTH);
          } else {
            View.instance.setDesignResolutionSize(this.fixedHeightDesignWidth, this.fixedHeightDesignHeight, ResolutionPolicy.FIXED_HEIGHT);
          }
        };
        return ResolutionAdjuster;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "fixedWidthDesignWidth", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1280;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "fixedWidthDesignHeight", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 720;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fixedHeightDesignWidth", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 720;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fixedHeightDesignHeight", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1280;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isAutoFit", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScrollControl.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './LogManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCInteger, Sprite, v3, UITransform, Component, LogManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      Sprite = module.Sprite;
      v3 = module.v3;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      LogManager = module.LogManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "5be96rGnAJHw4A1Vv2tjj1m", "ScrollControl", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ScrollControl = exports('ScrollControl', (_dec = ccclass('ScrollControl'), _dec2 = property(CCInteger), _dec3 = property(CCInteger), _dec4 = property(CCInteger), _dec5 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScrollControl, _Component);
        function ScrollControl() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "moveSpeed", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "loopWidth", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "extWidth", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bgSpr", _descriptor4, _assertThisInitialized(_this));
          _this._isRunning = false;
          _this._startPos = v3();
          return _this;
        }
        var _proto = ScrollControl.prototype;
        _proto.init = function init(screenWidth, initMoveSpeed) {
          this._isRunning = false;
          var uiTransform = this.bgSpr.getComponent(UITransform);
          uiTransform.width = screenWidth + this.loopWidth + this.extWidth;
          LogManager.log('init width', screenWidth, this.loopWidth, this.extWidth, uiTransform.width);
          this._startPos = v3(this.bgSpr.node.position);
          this._startPos.x = -Math.ceil(screenWidth * 0.5);
          this.moveSpeed = initMoveSpeed;
        };
        _proto.setRun = function setRun(isRunning) {
          this._isRunning = isRunning;
        };
        _proto.setMoveSpeed = function setMoveSpeed(v) {
          this.moveSpeed = v;
        };
        _proto.update = function update(deltaTime) {
          if (this._isRunning) {
            var pos = this.bgSpr.node.position;
            var newPos = v3(pos.x - this.moveSpeed * deltaTime, pos.y);
            if (this._startPos.x - newPos.x > this.loopWidth) {
              newPos.x += this.loopWidth;
            }
            this.bgSpr.node.setPosition(newPos);
          }
        };
        return ScrollControl;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "moveSpeed", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loopWidth", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 432;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "extWidth", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 64;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bgSpr", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Singleton.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "66e052PuDFDHaTthUmgPYou", "Singleton", undefined);
      var Singleton = exports('Singleton', /*#__PURE__*/function () {
        function Singleton() {}
        Singleton.Instance = function Instance() {
          var _class = this;
          if (!_class._instance) {
            _class._instance = new _class();
          }
          return _class._instance;
        };
        Singleton.getInstance = function getInstance() {
          var _class = this;
          if (!_class._instance) {
            _class._instance = new _class();
          }
          return _class._instance;
        };
        return Singleton;
      }());
      Singleton._instance = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/telegram-web.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator;
  return {
    setters: [function (module) {
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "cb8407D3zdPOIUY4npAWBMx", "telegram-web", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var tgLoadPromise = new Promise(function (resolve, reject) {
        // if (sys.platform === sys.Platform.MOBILE_BROWSER || sys.platform === sys.Platform.DESKTOP_BROWSER) {
        var script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-web-app.js";
        script.async = true;
        script.onload = function () {
          var intervalId = setInterval(function () {
            console.log("TelegramWebApp start: ", window.Telegram.WebApp);
            if (window.Telegram && window.Telegram.WebApp) {
              console.log("loading telegram web app sdk success!");
              resolve(window.Telegram.WebApp);
              clearInterval(intervalId);
            }
          }, 100);
        };
        script.onerror = function () {
          return reject(new Error("Unable to load TelegramWebApp SDK, please check logs."));
        };
        document.head.appendChild(script);
        // }
      });

      var TelegramWebApp = exports('TelegramWebApp', (_dec = ccclass('TelegramWebApp'), _dec(_class = (_class2 = /*#__PURE__*/function () {
        function TelegramWebApp() {
          this._tgWebAppJS = null;
        }
        var _proto = TelegramWebApp.prototype;
        _proto.init = /*#__PURE__*/function () {
          var _init = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return tgLoadPromise;
                case 2:
                  this._tgWebAppJS = _context.sent;
                  if (!this._tgWebAppJS) {
                    _context.next = 7;
                    break;
                  }
                  return _context.abrupt("return", Promise.resolve({
                    success: true
                  }));
                case 7:
                  return _context.abrupt("return", Promise.resolve({
                    success: false
                  }));
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function init() {
            return _init.apply(this, arguments);
          }
          return init;
        }();
        _proto.openTelegramLink = function openTelegramLink(url) {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return;
          }
          console.log(url);
          this._tgWebAppJS.openTelegramLink(url);
        };
        _proto.share = function share(url, text) {
          var shareUrl = 'https://t.me/share/url?url=' + url + '&' + new URLSearchParams({
            text: text || ''
          }).toString();
          this.openTelegramLink(shareUrl);
        };
        _proto.getTelegramWebApp = function getTelegramWebApp() {
          return this._tgWebAppJS;
        };
        _proto.getTelegramWebAppInitData = function getTelegramWebAppInitData() {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          return this._tgWebAppJS.initDataUnsafe;
        };
        _proto.getTelegramUser = function getTelegramUser() {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          return this._tgWebAppJS.initDataUnsafe.user;
        };
        _proto.getTelegramInitData = function getTelegramInitData() {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          return this._tgWebAppJS.initData;
        };
        _proto.openInvoice = function openInvoice(url, callback) {
          if (!this._tgWebAppJS) {
            console.error("telegram web app is not inited!");
            return null;
          }
          this._tgWebAppJS.openInvoice(url, callback);
        };
        _proto.alert = function alert(message) {
          this._tgWebAppJS.showAlert(message);
        };
        _createClass(TelegramWebApp, null, [{
          key: "Instance",
          get: function get() {
            if (!TelegramWebApp._instance) {
              TelegramWebApp._instance = new TelegramWebApp();
            }
            return TelegramWebApp._instance;
          }
        }]);
        return TelegramWebApp;
      }(), _class2._instance = void 0, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ToolsView.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './index.ts', './telegram-web.ts', './Config.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Sprite, Label, assetManager, SpriteFrame, Texture2D, Component, __webpack_exports__Address, __webpack_exports__toNano, TelegramWebApp, config;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Label = module.Label;
      assetManager = module.assetManager;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      Component = module.Component;
    }, function (module) {
      __webpack_exports__Address = module.Address;
      __webpack_exports__toNano = module.toNano;
    }, function (module) {
      TelegramWebApp = module.TelegramWebApp;
    }, function (module) {
      config = module.config;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "874acV7CphGFoiviIgCenwz", "ToolsView", undefined);
      // import { TonAddressConfig } from './FlappyBirdLite';
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var ToolsView = exports('ToolsView', (_dec = ccclass('ToolsView'), _dec2 = property(Sprite), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ToolsView, _Component);
        function ToolsView() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "headSp", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nameLab", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "addressLab", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "searchLab", _descriptor4, _assertThisInitialized(_this));
          _this._gameFi = void 0;
          _this._tonAddressConfig = void 0;
          _this._backServerUrl = void 0;
          return _this;
        }
        var _proto = ToolsView.prototype;
        _proto.start = function start() {
          this.searchLab.string = window.location.search;
        };
        _proto.setGameFi = function setGameFi(gamefi) {
          this._gameFi = gamefi;
          if (this._gameFi && this._gameFi.walletConnector.connected) {
            var address = this._gameFi.walletConnector.account.address;
            this.addressLab.string = __webpack_exports__Address.parseRaw(address).toString({
              testOnly: true,
              bounceable: false
            }).substring(0, 6) + '...';
          } else {
            this.addressLab.string = 'Unconnected';
          }
          this.updateTelegramInfo();
        };
        _proto.setTonAddressConfig = function setTonAddressConfig(config) {
          this._tonAddressConfig = config;
        };
        _proto.setBackServerUrl = function setBackServerUrl(url) {
          this._backServerUrl = url;
        };
        _proto.updateTelegramInfo = function updateTelegramInfo() {
          var userData = TelegramWebApp.Instance.getTelegramUser();
          console.log("userData : ", userData);
          if (userData) {
            // load username
            if (userData.username) {
              this.nameLab.string = userData.username;
            } else {
              this.nameLab.string = userData.first_name + ' ' + userData.last_name ? userData.last_name : '';
            }

            // load profile photo
            if (userData.photo_url) {
              var fileExtension = userData.photo_url.split('.').pop().toLowerCase();
              if (fileExtension == 'jpeg' || fileExtension == 'jpg' || fileExtension == 'png') {
                assetManager.loadRemote(userData.photo_url, function (err, imageAsset) {
                  var spriteFrame = new SpriteFrame();
                  var texture = new Texture2D();
                  texture.image = imageAsset;
                  spriteFrame.texture = texture;
                  this.headSp.spriteFrame = spriteFrame;
                });
              }
            }
          }
        };
        _proto.onClose = function onClose() {
          this.node.active = false;
        };
        _proto.onTransferTon = function onTransferTon() {
          var _this$_gameFi$walletC;
          if (this._gameFi && (_this$_gameFi$walletC = this._gameFi.walletConnector) != null && _this$_gameFi$walletC.connected) {
            var tonTransferReq = {
              to: __webpack_exports__Address.parse(this._tonAddressConfig.tonAddress),
              amount: __webpack_exports__toNano(0.01)
            };
            this._gameFi.transferTon(tonTransferReq);
          }
        };
        _proto.onBuyWithTon = function onBuyWithTon() {
          var tonTransferReq = {
            amount: __webpack_exports__toNano(0.01)
          };
          this._gameFi.buyWithTon(tonTransferReq);
        };
        _proto.onShowJetton = function onShowJetton() {
          var jettonMasterAddress = __webpack_exports__Address.parse(this._tonAddressConfig.jettonAddress);
          var show = /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_gameFi, jettonMasterAddress) {
              var openJetton, jettonContent, message;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    openJetton = _gameFi.assetsSdk.openJetton(jettonMasterAddress);
                    _context.next = 3;
                    return openJetton.getContent();
                  case 3:
                    jettonContent = _context.sent;
                    message = "jetton name: " + jettonContent.name + "\njetton decimals: " + jettonContent.decimals;
                    console.log("jetton", message);
                    TelegramWebApp.Instance.alert(message);
                  case 7:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function show(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }();
          show(this._gameFi, jettonMasterAddress);
        };
        _proto.onGetTelegramUserData = function onGetTelegramUserData() {
          this.updateTelegramInfo();
        };
        _proto.onShare = function onShare() {
          var userId = '';
          var userData = TelegramWebApp.Instance.getTelegramUser();
          console.log("userData : ", userData);
          if (userData) {
            userId = userData.id + '';
          }
          TelegramWebApp.Instance.share("https://t.me/birds_li_bot?game=ggg?startapp=" + userId, "Invite you to play a very interesting game");
        };
        _proto.onBuyWithStars = function onBuyWithStars() {
          fetch(config.backendUrl + "/create-stars-invoice", {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "ngrok-skip-browser-warning": "1"
            },
            method: 'POST',
            body: JSON.stringify({
              title: "cloths items",
              description: "this jacket is very cool",
              payload: "op1000001",
              currency: "Mars",
              prices: [{
                label: "product_label",
                amount: "1"
              }]
            })
          }).then(function (response) {
            return response.json();
          }).then(function (value) {
            console.log("starts invoice : ", value);
            if (value.ok) {
              TelegramWebApp.Instance.openInvoice(value.invoiceLink, function (result) {
                console.log("buy stars : ", result);
              })["catch"](function (error) {
                console.error("open invoice error : ", error);
              });
            } else {
              console.error('request config failed!');
            }
          });
        };
        return ToolsView;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "headSp", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameLab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "addressLab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "searchLab", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Utils.ts", ['cc'], function (exports) {
  var cclegacy, sys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "7be38aXQdpAAqmXMi5TZi7b", "Utils", undefined);
      var Utils = exports('Utils', /*#__PURE__*/function () {
        function Utils() {}
        Utils.rollBoolArray = function rollBoolArray(arr, rollCnt1, rollCnt2) {
          var len = arr.length;
          for (var i = 0; i < rollCnt1 && i < len; ++i) {
            var r = Math.floor(Math.random() * len);
            var a = arr[i];
            arr[i] = arr[r];
            arr[r] = a;
          }
          for (var _i = 0; _i < rollCnt2; ++_i) {
            var r1 = Math.floor(Math.random() * len);
            var r2 = Math.floor(Math.random() * len);
            var _a = arr[r1];
            arr[r1] = arr[r2];
            arr[r2] = _a;
          }
        };
        Utils.OpenURLByNewTab = function OpenURLByNewTab(url) {
          sys.openURL(url);
        };
        Utils.OpenURLByCurTab = function OpenURLByCurTab(url) {
          window.location.href = url;
        };
        Utils.getTimeStamp = function getTimeStamp() {
          // var timestamp = Date.parse(new Date().toString());
          var timestamp = Date.now();
          return timestamp;
        };
        Utils.getTimeStampSecond = function getTimeStampSecond() {
          return Math.floor(this.getTimeStamp() / 1000);
        };
        Utils.getLocationUrlParam = function getLocationUrlParam(urlKey) {
          var paramsStr = window.location.search;
          var params = new URLSearchParams(paramsStr);
          return params.get(urlKey);
        };
        Utils.getUrlParam1 = function getUrlParam1(urlStr, urlKey) {
          var url = new URL(urlStr);
          var paramsStr = url.search.slice(1);
          var params = new URLSearchParams(paramsStr);
          return params.get(urlKey); // list
        };

        Utils.getUrlParam2 = function getUrlParam2(urlStr, urlKey) {
          var url = new URL(urlStr); // 字符串转换成url格式
          var paramsStr = url.search.slice(1); // 获取'?'后面的参数字符串
          var paramsArr = paramsStr.split('&'); // 分割'&'字符 获得参数数组
          for (var i = 0; i < paramsArr.length; i++) {
            var tempArr = paramsArr[i].split('=');
            if (tempArr[0] === urlKey) {
              return tempArr[1];
            }
          }
          return '';
        };
        Utils.getUrlParam3 = function getUrlParam3(urlStr, urlKey) {
          var url = new URL(urlStr);
          var reg = new RegExp('[\?\&]' + urlKey + '=([^\&]*)(\&?)', 'i');
          var r = url.search.match(reg);
          return r ? r[1] : '';
        };
        return Utils;
      }());
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map