//  プラグイン  mmyScript  Version 1.0
//  2018/2/18 by Tex
//  http://tex1.symphonic-net.com/
//
//  実装：スピン攻撃、HP表示
//
//  正男の特技から設定
//  101 - Xキーでスピン攻撃
//  102 - 正男のHP3
//  103 - 正男のHP5

var mmyScripts = (function() {
  //  クロージャ内変数
  var plugin_manager = null; //  プラグインマネージャー

  //  スピン用変数
  mmySpin_simg = new Array(4);
  var mmySpin_spinFlag = false; //アニメーションカウンタ
  var mmySpin_spinUse = false;

  //  HP用変数
  mmyHp_simg = new Array(4);
  var mmyHp_hpUse = false;
  var mmyHp_setHP = 3;

  //  起動時の初期化
  function initLoad(ap) {

    //  イベントの設定
    plugin_manager.addEventListener("gamestart", mmyScripts.gameStartEvent);
    plugin_manager.addEventListener("game", mmyScripts.gameEvent);
    plugin_manager.addEventListener("putathletic", mmyScripts.putAthleticEvent);

    //  パターン画像からチップを作成
    var mmy_imgPtn = ap.getParamValue("filename_pattern");
    mmy_sid = ap.newChipImage(mmy_imgPtn, 32, 32, 10, 26);
    ap.makeReverseChipImage(mmy_sid);

    //  スピン用のパターン画像を取得
    for (var i = 0; i < 4; i++){
      mmySpin_simg[i] = ap.getChipImage(mmy_sid, i + 250, 0);
    }

    //  HP用のパターン画像を取得
    for (var i = 0; i < 2; i++){
      mmyHp_simg[i] = ap.getChipImage(mmy_sid, i + 254, 0);
    }
  }

  //  ゲーム開始時の初期化
  function initGameStart(ap) {

    //  スピン初期化
    mmySpin_spinFlag = false;
    mmySpin_spinUse = false;

    //  HP初期化
    mmyHp_hpUse = true;

    //  正男の特技を取得
    var mmy_GetParam_Tokugi = ap.getParamValue("j_tokugi");
    var mmy_GetParam_AddTokugi1 = ap.getParamValue("j_add_tokugi");
    var mmy_GetParam_AddTokugi2 = ap.getParamValue("j_add_tokugi2");
    var mmy_GetParam_AddTokugi3 = ap.getParamValue("j_add_tokugi3");
    var mmy_GetParam_AddTokugi4 = ap.getParamValue("j_add_tokugi4");

    //  特技のParamを取得
    if(mmy_GetParam_Tokugi == 101 || mmy_GetParam_AddTokugi1  == 101 || mmy_GetParam_AddTokugi2  == 101 || mmy_GetParam_AddTokugi3  == 101 || mmy_GetParam_AddTokugi4 == 101){
      mmySpin_spinUse = true;
    }
    if(mmy_GetParam_Tokugi == 102 || mmy_GetParam_AddTokugi1  == 102 || mmy_GetParam_AddTokugi2  == 102 || mmy_GetParam_AddTokugi3  == 102 || mmy_GetParam_AddTokugi4 == 102){
      mmyHp_hpUse = true;
      mmyHp_setHP = 3;
    }
    if(mmy_GetParam_Tokugi == 103 || mmy_GetParam_AddTokugi1  == 103 || mmy_GetParam_AddTokugi2  == 103 || mmy_GetParam_AddTokugi3  == 103 || mmy_GetParam_AddTokugi4 == 103){
      mmyHp_hpUse = true;
      mmyHp_setHP = 5;
    }

    //  HPセット
    if(mmyHp_hpUse == true){ap.setMyMaxHP(mmyHp_setHP);}
  }

  //  スピン
  function mmy_Spin(ap) {
    key = ap.getKeyCode();
    myX = ap.getMyX();
    myY = ap.getMyY();
    myYr = ap.getMyYReal();
    myXr = ap.getMyXReal();
    //  Xキーが押された
    if (key == 88 && !mmySpin_spinFlag){mmySpin_spinFlag = 1;}

    if (mmySpin_spinFlag) {
      if (mmySpin_spinFlag == 1) {ap.playSound(12);}
      //  左右の敵を倒す
      ap.destroyEnemy(myXr + 32, myYr, 20, 20);
      ap.destroyEnemy(myXr - 32, myYr, 20, 20);
      //  アニメーション
      ap.setMyObjectImage(mmySpin_simg[mmySpin_spinFlag - 1],0,0);
      mmySpin_spinFlag++;
      //  アニメーションリセット
      if(mmySpin_spinFlag > 5){
        mmySpin_spinFlag=0;
        ap.setMyObjectImage(null,0,0);
      }

    }
    //  キー解放
    ap.resetKeyCode();

  }

  // HP
  function mmy_Hp(os_g, ap) {
    //  HPを取得
    var nowhp = ap.getMyHP();
    var HPc = mmyHp_setHP - nowhp;
    //  残り
    for (i = 1; i < nowhp + 1; i++) {
      os_g.drawImage(mmyHp_simg[0], 32 * i, 32);
    }
    //  減った分
    for (i = 1; i < HPc + 1; i++) {
      os_g.drawImage(mmyHp_simg[1], 32 * (i + nowhp), 32);
    }
  }

  //  公開メソッド
  return {
    setPluginManager: function(pm) {
      //  プラグインマネージャーをセット
      plugin_manager = pm;
      //  拡張仕掛けを使う
      //plugin_manager.setExtendAthleticEnable(true);
      //  起動時に呼び出す関数
      plugin_manager.addEventListener("onload", mmyScripts.onLoadEvent);
    },
    onLoadEvent: function(os_g, ap) {
      //  起動

      //  起動時の初期化
      initLoad(ap);
    },
    gameStartEvent: function(os_g, ap, stage) {
      //  ゲーム開始
      initGameStart(ap);

    },
    gameEvent: function(os_g, ap, view_x, view_y) {
      //  ゲーム中

      //  スピン攻撃
      if(mmySpin_spinUse == true){mmy_Spin(ap);}

      //  HP
      if(mmyHp_hpUse == true){mmy_Hp(os_g, ap);}
    }
  };
})();
