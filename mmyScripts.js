//  プラグイン  mmyScripts  Version 1.15
//  2018/3/30 by Tex
//  http://mmy.fe8works.com/
//
//  2018/2/26 by kururin 1.13-k
//
//  実装：スピン攻撃、HP表示、反重力、スターリング
//       回る床、コウモリ
//  使用にはプラグインマネージャーが必要です
//
//  特技の設定値
//  101 - Xキーでスピン攻撃
//  102 - 正男のHP3
//  103 - 正男のHP5
//  104 - 重力を上にする
//
//  仕掛けの設定値
//  5000 - 重力上
//  5001 - 重力下
//  5002 - スターリング上
//  5003 - スターリング左
//  5004 - スターリング右
//  5005 - 円を描くように動く床*２ 右
//  5006 - 円を描くように動く床*２ 左
//  5007 - 円を描くように動く床*４ 右
//  5008 - 円を描くように動く床*４ 左
//  5009 - スーパー正男２のコウモリ
//  5010 - 羽根つきアイテムボックス　1UP
//  5011 - 羽根つきアイテムボックス　コイン
//  5012 - 羽根つきアイテムボックス　ファイアボール
//  5013 - 羽根つきアイテムボックス　バリア
//  5014 - 羽根つきアイテムボックス　タイム
//  5015 - 羽根つきアイテムボックス　ジェット
//  5016 - 羽根つきアイテムボックス　ヘルメット
//  5017 - 羽根つきアイテムボックス　しっぽ
//  5018 - 羽根つきアイテムボックス　ドリル
//  5019 - 羽根つきアイテムボックス　グレネード
//  5020 - 羽根つきアイテムボックス右移動　1UP
//  5021 - 羽根つきアイテムボックス右移動　コイン
//  5022 - 羽根つきアイテムボックス右移動　ファイアボール
//  5023 - 羽根つきアイテムボックス右移動　バリア
//  5024 - 羽根つきアイテムボックス右移動　タイム
//  5025 - 羽根つきアイテムボックス右移動　ジェット
//  5026 - 羽根つきアイテムボックス右移動　ヘルメット
//  5027 - 羽根つきアイテムボックス右移動　しっぽ
//  5028 - 羽根つきアイテムボックス右移動　ドリル
//  5029 - 羽根つきアイテムボックス右移動　グレネード
//  5030 - 羽根つきアイテムボックス左移動　1UP
//  5031 - 羽根つきアイテムボックス左移動　コイン
//  5032 - 羽根つきアイテムボックス左移動　ファイアボール
//  5033 - 羽根つきアイテムボックス左移動　バリア
//  5034 - 羽根つきアイテムボックス左移動　タイム
//  5035 - 羽根つきアイテムボックス左移動　ジェット
//  5036 - 羽根つきアイテムボックス左移動　ヘルメット
//  5037 - 羽根つきアイテムボックス左移動　しっぽ
//  5038 - 羽根つきアイテムボックス左移動　ドリル
//  5039 - 羽根つきアイテムボックス左移動　グレネード
//  5040 - 羽根つきアイテムボックス壁反転　1UP
//  5041 - 羽根つきアイテムボックス壁反転　コイン
//  5042 - 羽根つきアイテムボックス壁反転　ファイアボール
//  5043 - 羽根つきアイテムボックス壁反転　バリア
//  5044 - 羽根つきアイテムボックス壁反転　タイム
//  5045 - 羽根つきアイテムボックス壁反転　ジェット
//  5046 - 羽根つきアイテムボックス壁反転　ヘルメット
//  5047 - 羽根つきアイテムボックス壁反転　しっぽ
//  5048 - 羽根つきアイテムボックス壁反転　ドリル
//  5049 - 羽根つきアイテムボックス壁反転　グレネード
//  5050 - 放置アイテム 1UP
//  5051 - 放置アイテム ファイアボール
//  5052 - 放置アイテム バリア
//  5053 - 放置アイテム タイム
//  5054 - 放置アイテム ジェット
//  5055 - 放置アイテム ヘルメット
//  5056 - 放置アイテム しっぽ
//  5057 - 放置アイテム ドリル
//  5058 - 放置アイテム グレネード

var mmyScripts = (function() {
  //  クロージャ内変数
  var plugin_manager = null; //  プラグインマネージャー

  //  スピン用変数
  mmySpin_simg = new Array(8);
  var mmySpin_spinFlag = 0; //アニメーションカウンタ
  var mmySpin_spinUse = false;

  //  HP用変数
  mmyHp_simg = new Array(2);
  var mmyHp_hpUse = false;
  var mmyHp_setHP = 3;

  //  反重力用変数
  ag_imgL = new Array(9);
  ag_imgR = new Array(9);
  ag_simg = new Array(2);
  var mmyAG_agUse = true;
  var mmyAg_def = false;

  //  反重力用変数
  var mmyAg_preVX = 0; // 踏みつけ前のVX
  var mmyAg_pressed = false; // 踏みつけ後、着地までtrue
  var muki = 0;
  var agRc, agc = 0,
    ob_c = 0,
    j_count = 8,
    gmoc = 0;

  //  スターリング用変数
  var str_simg = new Array(3);
  var mmy_str_c = 0;
  var mmy_str_yc = 0;

  var komori_simg = [];

  var yuka1_img = [];

  var wing_simg = [];

  //  拡張仕掛け用変数
  var ea_id_max = 0; // ＩＤ最大値
  var ea_con = []; //  状態
  var ea_x = []; //  Ｘ座標
  var ea_y = []; //  Ｙ座標
  var ea_x2 = []; //  Ｘ座標
  var ea_y2 = []; //  Ｙ座標
  var ea_x_or = []; //  Ｘ座標
  var ea_y_or = []; //  Ｙ座標
  var ea_vx = []; //  Ｘ座標
  var ea_vy = []; //  Ｙ座標
  var ea_ang = [];
  var ea_rot = [];
  var ea_c1 = [];
  var ea_c2 = [];
  var ea_pt = []; //  パターン
  var ea_pt2 = []; //  拡張パターン
  var ea_ptr = []; //  パターン反転
  var ea_id = []; //  ＩＤ
  var ea_type = []; // 1でパターン画像、2で追加パターン
  var ea_yuka1 = [];
  var ea_yuka2 = [];
  var ea_yuka3 = [];
  var ea_yuka4 = [];

  var ac_4 = 0;
  var ac_8 = 0;

  //  起動時の初期化
  function initLoad(ap) {

    //  イベントの設定
    plugin_manager.addEventListener("gamestart", mmyScripts.gameStartEvent);
    plugin_manager.addEventListener("game", mmyScripts.gameEvent);
    plugin_manager.addEventListener("putathletic", mmyScripts.putAthleticEvent);

    //  パターン画像を元に拡張パターンを作成
    var mmy_imgPtn = ap.getParamValue("filename_pattern");
    mmy_sid = ap.newChipImage(mmy_imgPtn, 32, 32, 10, 28);
    ap.makeReverseChipImage(mmy_sid);

    mmy_sid2 = ap.newChipImage(mmy_imgPtn, 96, 32, 3, 27);
    ap.makeReverseChipImage(mmy_sid2);

    //  スピン用のパターン画像を取得
    for (i = 0; i < 4; i++) {
      mmySpin_simg[i] = ap.getChipImage(mmy_sid, i + 250, 0);
      mmySpin_simg[i + 4] = ap.getChipImage(mmy_sid, i + 250, 3);
    }

    //  HP用のパターン画像を取得
    for (i = 0; i < 2; i++) {
      mmyHp_simg[i] = ap.getChipImage(mmy_sid, i + 254, 0);
    }

    //  反重力用の主人公パターンを作成
    for (i = 0; i <= 9; i++) {
      ag_imgL[i] = ap.getChipImage(mmy_sid, i + 100, 2);
      ag_imgR[i] = ap.getChipImage(mmy_sid, i + 100, 3);
    }

    //  反重力用のパネル画像を取得
    ag_simg[0] = ap.getChipImage(mmy_sid, 259, 0);
    ag_simg[1] = ap.getChipImage(mmy_sid, 259, 3);

    //  スターリング画像を取得
    for (i = 0; i < 3; i++) {
      str_simg[i] = ap.getChipImage(mmy_sid, i + 256, 0);
    }
    //  コウモリ画像を取得
    komori_simg[0] = ap.getChipImage(mmy_sid, 260, 0);
    komori_simg[1] = ap.getChipImage(mmy_sid, 261, 0);
    komori_simg[2] = ap.getChipImage(mmy_sid, 262, 0);
    komori_simg[3] = ap.getChipImage(mmy_sid, 261, 1);
    komori_simg[4] = ap.getChipImage(mmy_sid, 262, 1);
    komori_simg[5] = ap.getChipImage(mmy_sid, 263, 0);
    komori_simg[6] = ap.getChipImage(mmy_sid, 263, 1);


    //  移動床用の画像を取得
    yuka1_img[0] = ap.getChipImage(mmy_sid2, 57, 0);

    wing_simg[0] = ap.getChipImage(mmy_sid, 264, 0);
    wing_simg[1] = ap.getChipImage(mmy_sid, 265, 0);
    wing_simg[2] = ap.getChipImage(mmy_sid, 264, 1);
    wing_simg[3] = ap.getChipImage(mmy_sid, 265, 1);


  }

  //  ゲーム開始時の初期化
  function initGameStart(ap) {

    //  仕掛けの初期化
    ea_id_max = 0;
    ac_4 = 0;
    for (var i = 0; i < 100; i++) {
      ea_con[i] = 0;
    }

    //  スピン初期化
    mmySpin_spinFlag = 0;
    mmySpin_spinUse = false;

    //  HP初期化
    mmyHp_hpUse = false;

    //  反重力初期化
    mmyAg_def = false;
    mmyAg_pressed = false;
    mmyAg_preVX = 0;

    //  スターリング初期化
    mmy_str_c = 0;
    mmy_str_yc = 0;

    //  正男の特技を取得
    var mmy_GetParam_Tokugi = ap.getParamValue("j_tokugi");
    var mmy_GetParam_AddTokugi1 = ap.getParamValue("j_add_tokugi");
    var mmy_GetParam_AddTokugi2 = ap.getParamValue("j_add_tokugi2");
    var mmy_GetParam_AddTokugi3 = ap.getParamValue("j_add_tokugi3");
    var mmy_GetParam_AddTokugi4 = ap.getParamValue("j_add_tokugi4");

    //  特技のParamを取得
    if (mmy_GetParam_Tokugi == 101 || mmy_GetParam_AddTokugi1 == 101 || mmy_GetParam_AddTokugi2 == 101 || mmy_GetParam_AddTokugi3 == 101 || mmy_GetParam_AddTokugi4 == 101) {
      mmySpin_spinUse = true;
    }
    if (mmy_GetParam_Tokugi == 102 || mmy_GetParam_AddTokugi1 == 102 || mmy_GetParam_AddTokugi2 == 102 || mmy_GetParam_AddTokugi3 == 102 || mmy_GetParam_AddTokugi4 == 102) {
      mmyHp_hpUse = true;
      mmyHp_setHP = 3;
    }
    if (mmy_GetParam_Tokugi == 103 || mmy_GetParam_AddTokugi1 == 103 || mmy_GetParam_AddTokugi2 == 103 || mmy_GetParam_AddTokugi3 == 103 || mmy_GetParam_AddTokugi4 == 103) {
      mmyHp_hpUse = true;
      mmyHp_setHP = 5;
    }
    if (mmy_GetParam_Tokugi == 104 || mmy_GetParam_AddTokugi1 == 104 || mmy_GetParam_AddTokugi2 == 104 || mmy_GetParam_AddTokugi3 == 104 || mmy_GetParam_AddTokugi4 == 104) {
      mmyAg_def = true;
    }

    //  HPセット
    if (mmyHp_hpUse == true) {
      ap.setMyMaxHP(mmyHp_setHP);
    }

    //  反重力　フェイク用床セット
    agy1 = ap.newYuka(5 * 32, (26 + 10) * 32, 6 * 32, (26 + 10) * 32, "line");
    ap.setYukaType(agy1, 2);
    agc = 0;
    ob_c = 2;
    j_count = 8;

    //mmySpin_spinUse = false;
  }

  //  拡張仕掛け　設置
  function setExtendAth(code, x, y, ap) {
    for (var i = 0; i < 100; i++) {
      if (ea_con[i] != 0) continue;

      //  初期設定
      ea_x[i] = x;
      ea_y[i] = y;
      ea_x_or[i] = x;
      ea_y_or[i] = y;
      ea_vx[i] = 0;
      ea_vy[i] = 0;
      ea_pt[i] = 0;
      ea_c1[i] = 0;
      ea_c2[i] = 0;
      ea_pt2[i] = 0;
      ea_ptr[i] = 0;
      ea_id[i] = 0;
      ea_type[i] = 0;

      //  種類別の設定
      switch (code) {
        case 5000: //  重力パネル上
          ea_con[i] = 1000;
          ea_id[i] = 1;
          ea_pt[i] = 1;
          ea_pt2[i] = ag_simg[0];
          ea_type[i] = 1;
          break;
        case 5001: //  重力パネル下
          ea_con[i] = 1000;
          ea_id[i] = 2;
          ea_pt[i] = 1;
          ea_pt2[i] = ag_simg[1];
          ea_type[i] = 1;
          break;
        case 5002: //  スターリング　上
          ea_con[i] = 1100;
          ea_id[i] = 3;
          ea_pt[i] = 1;
          ea_pt2[i] = str_simg[0];
          ea_type[i] = 1;
          break;
        case 5003: //  スターリング　左
          ea_con[i] = 1100;
          ea_id[i] = 4;
          ea_pt[i] = 1;
          ea_pt2[i] = str_simg[1];
          ea_type[i] = 1;
          break;
        case 5004: //  スターリング　右
          ea_con[i] = 1100;
          ea_id[i] = 5;
          ea_pt[i] = 1;
          ea_pt2[i] = str_simg[2];
          ea_type[i] = 1;
          break;
        case 5005: //  縁を描くように移動する床
          ea_con[i] = 1110;
          ea_id[i] = 6;
          ea_pt[i] = 190;
          ea_ang[i] = 2;
          ea_rot[i] = 0;
          ea_type[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka2[i] = ap.newYuka(x, y, 80, 16, "rect");
          ap.setYukaImage(ea_yuka1[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka2[i], yuka1_img[0]);
          //ap.setYukaPattern(ea_yuka1[i],183,0);
          //ap.setYukaPattern(ea_yuka1[i],183,0);

          break;
        case 5006: //  縁を描くように移動する床
          ea_con[i] = 1111;
          ea_id[i] = 7;
          ea_pt[i] = 190;
          ea_ang[i] = 2;
          ea_rot[i] = 0;
          ea_type[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka2[i] = ap.newYuka(x, y, 80, 16, "rect");
          ap.setYukaImage(ea_yuka1[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka2[i], yuka1_img[0]);
          //ap.setYukaPattern(ea_yuka1[i],183,0);
          //ap.setYukaPattern(ea_yuka1[i],183,0);

          break;
        case 5007: //  縁を描くように移動する床 4
          ea_con[i] = 1112;
          ea_id[i] = 8;
          ea_pt[i] = 190;
          ea_ang[i] = 2;
          ea_rot[i] = 0;
          ea_type[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka2[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka3[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka4[i] = ap.newYuka(x, y, 80, 16, "rect");
          ap.setYukaImage(ea_yuka1[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka2[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka3[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka4[i], yuka1_img[0]);
          //ap.setYukaPattern(ea_yuka1[i],183,0);
          //ap.setYukaPattern(ea_yuka1[i],183,0);

          break;
        case 5008: //  縁を描くように移動する床 4
          ea_con[i] = 1113;
          ea_id[i] = 9;
          ea_pt[i] = 190;
          ea_ang[i] = 2;
          ea_rot[i] = 0;
          ea_type[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka2[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka3[i] = ap.newYuka(x, y, 80, 16, "rect");
          ea_yuka4[i] = ap.newYuka(x, y, 80, 16, "rect");
          ap.setYukaImage(ea_yuka1[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka2[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka3[i], yuka1_img[0]);
          ap.setYukaImage(ea_yuka4[i], yuka1_img[0]);
          //ap.setYukaPattern(ea_yuka1[i],183,0);
          //ap.setYukaPattern(ea_yuka1[i],183,0);

          break;
        case 5009: //  コウモリ
          ea_con[i] = 1150;
          ea_id[i] = 10;
          ea_pt[i] = 164;
          ea_pt2[i] = komori_simg[0];
          ea_rot[i] = 0;
          ea_vy[i] = 6;
          ea_vx[i] = 2;
          //ea_pt2[i] = str_simg[1];
          ea_type[i] = 1;
          break;
        case 5010: //  フライングアイテムボックス上下  1UP
          ea_con[i] = 1160;
          ea_id[i] = 11;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 0;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5011: //  フライングアイテムボックス上下  コイン
          ea_con[i] = 1160;
          ea_id[i] = 12;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 1;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5012: //  フライングアイテムボックス上下  ファイアボール
          ea_con[i] = 1160;
          ea_id[i] = 13;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5013: //  フライングアイテムボックス上下 バリア
          ea_con[i] = 1160;
          ea_id[i] = 14;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 3;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5014: //  フライングアイテムボックス上下 タイム
          ea_con[i] = 1160;
          ea_id[i] = 15;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 4;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5015: //  フライングアイテムボックス上下 ジェット
          ea_con[i] = 1160;
          ea_id[i] = 16;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 5;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5016: //  フライングアイテムボックス上下 ヘルメット
          ea_con[i] = 1160;
          ea_id[i] = 17;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 6;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5017: //  フライングアイテムボックス上下 しっぽ
          ea_con[i] = 1160;
          ea_id[i] = 18;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 7;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5018: //  フライングアイテムボックス上下 ドリル
          ea_con[i] = 1160;
          ea_id[i] = 19;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 8;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5019: //  フライングアイテムボックス上下 グレネード
          ea_con[i] = 1160;
          ea_id[i] = 20;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 9;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5020: //  フライングアイテムボックス右移動  1UP
          ea_con[i] = 1161;
          ea_id[i] = 21;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 0;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5021: //  フライングアイテムボックス右移動  コイン
          ea_con[i] = 1161;
          ea_id[i] = 22;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 1;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5022: //  フライングアイテムボックス右移動  ファイアボール
          ea_con[i] = 1161;
          ea_id[i] = 23;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5023: //  フライングアイテムボックス右移動 バリア
          ea_con[i] = 1161;
          ea_id[i] = 24;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 3;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5024: //  フライングアイテムボックス右移動 タイム
          ea_con[i] = 1161;
          ea_id[i] = 25;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 4;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5025: //  フライングアイテムボックス右移動 ジェット
          ea_con[i] = 1161;
          ea_id[i] = 26;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 5;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5026: //  フライングアイテムボックス右移動 ヘルメット
          ea_con[i] = 1161;
          ea_id[i] = 27;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 6;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5027: //  フライングアイテムボックス右移動 しっぽ
          ea_con[i] = 1161;
          ea_id[i] = 28;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 7;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5028: //  フライングアイテムボックス右移動　ドリル
          ea_con[i] = 1161;
          ea_id[i] = 29;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 8;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5029: //  フライングアイテムボックス右移動 グレネード
          ea_con[i] = 1161;
          ea_id[i] = 30;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 9;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5030: //  フライングアイテムボックス左移動  1UP
          ea_con[i] = 1162;
          ea_id[i] = 31;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 0;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5031: //  フライングアイテムボックス左移動  コイン
          ea_con[i] = 1162;
          ea_id[i] = 32;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 1;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5032: //  フライングアイテムボックス左移動  ファイアボール
          ea_con[i] = 1162;
          ea_id[i] = 33;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5033: //  フライングアイテムボックス左移動 バリア
          ea_con[i] = 1162;
          ea_id[i] = 34;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 3;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5034: //  フライングアイテムボックス左移動 タイム
          ea_con[i] = 1162;
          ea_id[i] = 35;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 4;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5035: //  フライングアイテムボックス左移動 ジェット
          ea_con[i] = 1162;
          ea_id[i] = 36;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 5;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5036: //  フライングアイテムボックス左移動 ヘルメット
          ea_con[i] = 1162;
          ea_id[i] = 37;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 6;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5037: //  フライングアイテムボックス左移動 しっぽ
          ea_con[i] = 1162;
          ea_id[i] = 38;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 7;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5038: //  フライングアイテムボックス左移動　ドリル
          ea_con[i] = 1162;
          ea_id[i] = 39;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 8;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5039: //  フライングアイテムボックス左移動 グレネード
          ea_con[i] = 1162;
          ea_id[i] = 40;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 9;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5040: //  フライングアイテムボックス壁反転  1UP
          ea_con[i] = 1163;
          ea_id[i] = 41;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 0;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5041: //  フライングアイテムボックス壁反転  コイン
          ea_con[i] = 1163;
          ea_id[i] = 42;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 1;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5042: //  フライングアイテムボックス壁反転  ファイアボール
          ea_con[i] = 1163;
          ea_id[i] = 43;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 2;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5043: //  フライングアイテムボックス壁反転 バリア
          ea_con[i] = 1163;
          ea_id[i] = 44;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 3;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5044: //  フライングアイテムボックス壁反転 タイム
          ea_con[i] = 1163;
          ea_id[i] = 45;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 4;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5045: //  フライングアイテムボックス壁反転 ジェット
          ea_con[i] = 1163;
          ea_id[i] = 46;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 5;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5046: //  フライングアイテムボックス壁反転 ヘルメット
          ea_con[i] = 1163;
          ea_id[i] = 47;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 6;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5047: //  フライングアイテムボックス壁反転 しっぽ
          ea_con[i] = 1163;
          ea_id[i] = 48;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 7;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5048: //  フライングアイテムボックス壁反転　ドリル
          ea_con[i] = 1163;
          ea_id[i] = 49;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 8;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5049: //  フライングアイテムボックス壁反転 グレネード
          ea_con[i] = 1163;
          ea_id[i] = 50;
          //ea_pt[i] = 164;
          ea_vy[i] = 4;
          ea_vx[i] = 2;
          ea_c1[i] = 9;
          ea_yuka1[i] = ap.newYuka(x, y, 32, 31, "rect");
          ap.setYukaPattern(ea_yuka1[i], 40, 0);
          break;
        case 5050: //  放置アイテム !UP
          ea_con[i] = 1170;
          ea_id[i] = 51;
          break;
        case 5051: //  放置アイテム ファイアボール
          ea_con[i] = 1172;
          ea_id[i] = 52;
          break;
        case 5052: //  放置アイテム バリア
          ea_con[i] = 1173;
          ea_id[i] = 53;
          break;
        case 5053: //  放置アイテム タイム
          ea_con[i] = 1174;
          ea_id[i] = 54;
          break;
        case 5054: //  放置アイテム ジェット
          ea_con[i] = 1175;
          ea_id[i] = 55;
          break;
        case 5055: //  放置アイテム ヘルメット
          ea_con[i] = 1176;
          ea_id[i] = 56;
          break;
        case 5056: //  放置アイテム しっぽ
          ea_con[i] = 1177;
          ea_id[i] = 57;
          break;
        case 5057: //  放置アイテム ドリル
          ea_con[i] = 1178;
          ea_id[i] = 58;
          break;
        case 5058: //  放置アイテム グレネード
          ea_con[i] = 1179;
          ea_id[i] = 59;
          break;
      }
      if (i > ea_id_max) ea_id_max = i;
      break;
    }
  }
  //  拡張仕掛け　動作
  function moveExtendAth(os_g, ap, view_x, view_y) {
    //  自分
    var my_x = ap.getMyXReal(); //  Ｘ座標
    var my_y = ap.getMyYReal(); //  Ｙ座標
    var my_fumi_f = false; //  踏み潰しフラグ
    var my_x_block = ap.getMyX();
    var my_y_block = ap.getMyY();
    muki = ap.getMyDirection();
    key = ap.getKeyCode();
    rgc = ap.isRideGround();


    for (var i = 0; i <= ea_id_max; i++) {
      if (ea_con[i] == 0) continue;
      switch (ea_con[i]) {
        case 500: //  潰れた  コウモリ
          ea_pt[i] = 149;
          ea_pt2[i] = komori_simg[5 + ea_ptr[i]];
          ea_c1[i]++;
          if (ea_c1[i] >= 10) {
            //  消える
            ea_con[i] = 0;
            ap.addScore(10);
          }
          break;
        case 1000: //  重力パネル

          //  画面外
          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;

            break;
          }
          ea_pt[i] = 1;


          //  自分との当たり判定
          if (my_x + 31 >= ea_x[i] + 4 && my_x <= ea_x[i] + 31 - 4 &&
            my_y + 31 >= ea_y[i] + 8 && my_y <= ea_y[i] + 31) {
            //反重力オン
            if (ea_id[i] == 1) {
              mmy_AG(ap, true);
            }
            //反重力オフ
            else if (ea_id[i] == 2) {
              mmy_AG(ap, false);
            }
          }

          break;

        case 1100: //  スターリング

          //  画面外
          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;

            break;
          }
          ea_pt[i] = 1;

          //  設置された座標をブロック単位で取得
          str_chip_x = ea_x[i] / 32 - 1;
          str_chip_y = ea_y[i] / 32 - 10;

          //  自分との当たり判定
          if (my_x + 31 >= ea_x[i] + 4 && my_x <= ea_x[i] + 31 - 4 &&
            my_y + 31 >= ea_y[i] + 8 && my_y <= ea_y[i] + 31) {
            if (mmy_str_c == 0) {
              ap.setMyWait(1, 101, muki);
              ap.playSound(14);
              mmy_str_c = 1;
            }
            ap.setMyPosition(str_chip_x, str_chip_y);
            if (key == 40) {
              if (agc == 0) {
                ap.setMyYReal(my_y + 20);
              } else if (agc == 1) {
                ap.setMyYReal(my_y - 20);
              }
              ap.resetKeyCode();
              mmy_str_c = 0;
              mmy_str_yc = 0;
            } else if (key == 32 || key == 90) {
              mmy_AG(ap, false);
              mmy_str_c = 0;

              ap.setMyYReal(my_y - 10);
              switch (ea_id[i]) {
                case 3:
                  ap.setMyVY(-300);
                  break;
                case 4:
                  ap.setMyVX(-300);
                  ap.setMyVY(-350);
                  break;
                case 5:
                  ap.setMyVX(+300);
                  ap.setMyVY(-350);
                  break;
              }
              ap.playSound(8);
              mmy_str_yc = 1;
              ap.resetKeyCode();
            }
          }
          if (mmy_str_c == 2 && my_x_block != str_chip_x || mmy_str_c == 2 && my_y_block != str_chip_y) {
            mmy_str_c = 0;
          }
          break;
        case 1110: //  円を描くように移動する２つの床
          ea_rot[i] += ea_ang[i];
          var ea_rot2 = ea_rot[i] + 180 + ea_ang[i];
          ea_x[i] = ea_x_or[i] + Math.floor(Math.cos(ea_rot[i] * Math.PI / 180) * (5 * 32)) - 24;
          ea_y[i] = ea_y_or[i] + Math.floor(Math.sin(ea_rot[i] * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x2 = ea_x_or[i] + Math.floor(Math.cos(ea_rot2 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y2 = ea_y_or[i] + Math.floor(Math.sin(ea_rot2 * Math.PI / 180) * (5 * 32)) + 32;
          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);
          ap.setYukaPosition(ea_yuka2[i], ea_x2, ea_y2);
          //os_g.drawLine(ea_x_or[i]+16 - view_x, ea_y_or[i]+16 - view_y,ea_x[i] - view_x, ea_y[i] - view_y);
          break;
        case 1111: //  円を描くように移動する２つの床　左
          ea_rot[i] += ea_ang[i];
          var ea_rot2 = ea_rot[i] + 180 + ea_ang[i];
          ea_x[i] = ea_x_or[i] + Math.floor(Math.sin(ea_rot[i] * Math.PI / 180) * (5 * 32)) - 24;
          ea_y[i] = ea_y_or[i] + Math.floor(Math.cos(ea_rot[i] * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x2 = ea_x_or[i] + Math.floor(Math.sin(ea_rot2 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y2 = ea_y_or[i] + Math.floor(Math.cos(ea_rot2 * Math.PI / 180) * (5 * 32)) + 32;
          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);
          ap.setYukaPosition(ea_yuka2[i], ea_x2, ea_y2);
          //os_g.drawLine(ea_x_or[i]+16 - view_x, ea_y_or[i]+16 - view_y,ea_x[i] - view_x, ea_y[i] - view_y);
          break;
        case 1112: //  円を描くように移動する４つの床　右
          ea_rot[i] += ea_ang[i];
          var ea_rot2 = ea_rot[i] + 90 + ea_ang[i];
          var ea_rot3 = ea_rot[i] + 180 + ea_ang[i];
          var ea_rot4 = ea_rot[i] + 270 + ea_ang[i];
          ea_x[i] = ea_x_or[i] + Math.floor(Math.cos(ea_rot[i] * Math.PI / 180) * (5 * 32)) - 24;
          ea_y[i] = ea_y_or[i] + Math.floor(Math.sin(ea_rot[i] * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x2 = ea_x_or[i] + Math.floor(Math.cos(ea_rot2 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y2 = ea_y_or[i] + Math.floor(Math.sin(ea_rot2 * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x3 = ea_x_or[i] + Math.floor(Math.cos(ea_rot3 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y3 = ea_y_or[i] + Math.floor(Math.sin(ea_rot3 * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x4 = ea_x_or[i] + Math.floor(Math.cos(ea_rot4 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y4 = ea_y_or[i] + Math.floor(Math.sin(ea_rot4 * Math.PI / 180) * (5 * 32)) + 32;
          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);
          ap.setYukaPosition(ea_yuka2[i], ea_x2, ea_y2);
          ap.setYukaPosition(ea_yuka3[i], ea_x3, ea_y3);
          ap.setYukaPosition(ea_yuka4[i], ea_x4, ea_y4);
          //os_g.drawLine(ea_x_or[i]+16 - view_x, ea_y_or[i]+16 - view_y,ea_x[i] - view_x, ea_y[i] - view_y);
          break;
        case 1113: //  円を描くように移動する４つの床　左
          ea_rot[i] += ea_ang[i];
          var ea_rot2 = ea_rot[i] + 90 + ea_ang[i];
          var ea_rot3 = ea_rot[i] + 180 + ea_ang[i];
          var ea_rot4 = ea_rot[i] + 270 + ea_ang[i];
          ea_x[i] = ea_x_or[i] + Math.floor(Math.sin(ea_rot[i] * Math.PI / 180) * (5 * 32)) - 24;
          ea_y[i] = ea_y_or[i] + Math.floor(Math.cos(ea_rot[i] * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x2 = ea_x_or[i] + Math.floor(Math.sin(ea_rot2 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y2 = ea_y_or[i] + Math.floor(Math.cos(ea_rot2 * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x3 = ea_x_or[i] + Math.floor(Math.sin(ea_rot3 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y3 = ea_y_or[i] + Math.floor(Math.cos(ea_rot3 * Math.PI / 180) * (5 * 32)) + 32;

          var ea_x4 = ea_x_or[i] + Math.floor(Math.sin(ea_rot4 * Math.PI / 180) * (5 * 32)) - 24;
          var ea_y4 = ea_y_or[i] + Math.floor(Math.cos(ea_rot4 * Math.PI / 180) * (5 * 32)) + 32;
          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);
          ap.setYukaPosition(ea_yuka2[i], ea_x2, ea_y2);
          ap.setYukaPosition(ea_yuka3[i], ea_x3, ea_y3);
          ap.setYukaPosition(ea_yuka4[i], ea_x4, ea_y4);
          //os_g.drawLine(ea_x_or[i]+16 - view_x, ea_y_or[i]+16 - view_y,ea_x[i] - view_x, ea_y[i] - view_y);
          break;
        case 1150: // コウモリ　ぶら下がっている
          ea_c2[i] = 0;
          //  画面外
          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }
          ea_ptr[i] = 0;
          ea_pt[i] = 147;
          ea_pt2[i] = komori_simg[0];

          //近くに寄ったら目がさめる
          if (my_x >= ea_x[i] - 4 * 32 && my_x <= ea_x[i] && my_y > ea_y[i] && my_y < ea_y[i] + 128) {
            ea_con[i] = 1151;
            ea_vx[i] = 2;
          }

          //  自分との当たり判定
          if (my_x + 31 >= ea_x[i] + 4 && my_x <= ea_x[i] + 31 - 4 &&
            my_y + 31 >= ea_y[i] + 8 && my_y <= ea_y[i] + 31) {
            if (ap.getMyVY() > 10 || my_fumi_f == true) {
              //  自分が降下中

              //  踏み潰す
              ea_con[i] = 500;
              ea_pt[i] = 149;
              ea_pt2[i] = komori_simg[5 + ea_ptr[i]];
              ea_c1[i] = 0;
              my_fumi_f = true;

              //  自分
              ap.setMyPress(1);
              ap.setMyYReal(ea_y[i] - 12);
            } else {
              //  自分  死亡
              ap.setMyMiss(2);
            }
          }

          break;
        case 1151: // コウモリ　移動
          vx = ea_vx[i]; //速度
          if (vx < 0) {
            ea_x[i] += vx;

            if (ea_x[i] <= ea_x_or[i] - 9 * 32) {
              ea_x[i] = ea_x_or[i] - 9 * 32;
              ea_vx[i] = 2;
              ea_ptr[i] = 1;
            }
          } else if (vx > 0) {
            ea_x[i] += vx;
            if (ea_x[i] == ea_x_or[i]) {
              ea_vx[i] = 0;
              ea_c2[i] = 1;
            } else if (ea_x[i] > ea_x_or[i]) {
              ea_x[i] = ea_x_or[i];
              ea_vx[i] = -2;
              ea_ptr[i] = 0;
            }
          }

          vy = ea_vy[i]; //  速度
          if (ea_y[i] < ea_y_or[i] + 6 || ea_y[i] > ea_y_or[i] + 96 - 6) {
            //  減速
            vy /= 2;
          }
          if (vy < 0) {
            ea_y[i] += vy;
            if (ea_y[i] == ea_y_or[i] && ea_c2[i] == 1) {
              ea_con[i] = 1150;
            } else if (ea_y[i] <= ea_y_or[i]) {
              ea_y[i] = ea_y_or[i];
              ea_vy[i] = 6;
            }
          } else if (vy > 0) {
            ea_y[i] += vy;
            if (ea_y[i] >= ea_y_or[i] + 96) {
              ea_y[i] = ea_y_or[i] + 96;
              ea_vy[i] = -6;
            }
          }

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  パターン
          if (ac_4 <= 1) {
            ea_pt[i] = 147;
            ea_pt2[i] = komori_simg[1 + ea_ptr[i] * 2];
          } else {
            ea_pt[i] = 148;
            ea_pt2[i] = komori_simg[2 + ea_ptr[i] * 2];
          }

          //  自分との当たり判定
          if (my_x + 31 >= ea_x[i] + 4 && my_x <= ea_x[i] + 31 - 4 &&
            my_y + 31 >= ea_y[i] + 8 && my_y <= ea_y[i] + 31) {
            if (ap.getMyVY() > 10 || my_fumi_f == true) {
              //  自分が降下中

              //  踏み潰す
              ea_con[i] = 500;
              ea_pt[i] = 149;
              ea_pt2[i] = komori_simg[5 + ea_ptr[i]];
              ea_c1[i] = 0;
              my_fumi_f = true;

              //  自分
              ap.setMyPress(1);
              ap.setMyYReal(ea_y[i] - 12);
            } else {
              //  自分  死亡
              ap.setMyMiss(2);
            }
          }

          break;
          //  フライングアイテムボックス　固定
        case 1160:

          if (my_x >= ea_x[i] - 15 && my_x + 15 <= ea_x[i] + 31 &&
            my_y > ea_y[i] && my_y <= ea_y[i] + 31) {
            ea_y[i] = ea_y[i] - 32;
            ea_con[i] = 1170 + ea_c1[i];
            ap.setYukaPattern(ea_yuka1[i], 41, 0);
            ap.playSound(14);
            break;
          }
          //  移動
          vy = ea_vy[i]; //  速度
          if (ea_y[i] < ea_y_or[i] - 128 + 8 || ea_y[i] > ea_y_or[i] - 8) {
            //  減速
            vy /= 2;
          }
          if (vy < 0) {
            ea_y[i] += vy;
            if (ea_y[i] <= ea_y_or[i] - 128) {
              ea_y[i] = ea_y_or[i] - 128;
              ea_vy[i] = 4;
            }
          } else {
            ea_y[i] += vy;
            if (ea_y[i] >= ea_y_or[i]) {
              ea_y[i] = ea_y_or[i];
              ea_vy[i] = -4;
            }
          }

          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);

          if (ea_x[i] + 32 - view_x < -31 || ea_x[i] + 32 - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  パターン
          if (ac_4 <= 1) {
            os_g.drawImage(wing_simg[0], ea_x[i] - 32 - view_x, ea_y[i] - view_y);
            os_g.drawImage(wing_simg[2], ea_x[i] + 32 - view_x, ea_y[i] - view_y);
          } else {
            os_g.drawImage(wing_simg[1], ea_x[i] - 32 - view_x, ea_y[i] - view_y);
            os_g.drawImage(wing_simg[3], ea_x[i] + 32 - view_x, ea_y[i] - view_y);
          }


          /*
          if (my_x >= ea_x[i]-16 && my_x+16 <= ea_x[i]+31 &&
          my_y > ea_y[i] && my_y-4 <= ea_y[i]+31 && vy < 0) {
            console.log("now");
            ea_con[i] = 1161;
          }
          else if (my_x >= ea_x[i]-16 && my_x+16 <= ea_x[i]+31 &&
          my_y > ea_y[i] && my_y <= ea_y[i]+31 && vy > 0) {
            console.log("now2");
            ea_con[i] = 1161;
          }
          */

          break;
          //  フライングアイテムボックス　右移動
        case 1161:

          if (my_x >= ea_x[i] - 15 && my_x + 15 <= ea_x[i] + 31 &&
            my_y > ea_y[i] && my_y <= ea_y[i] + 31) {
            ea_y[i] = ea_y[i] - 32;
            ea_con[i] = 1170 + ea_c1[i];
            ap.setYukaPattern(ea_yuka1[i], 41, 0);
            ap.playSound(14);
            break;
          }
          //  移動
          vy = ea_vy[i]; //  速度
          if (ea_y[i] < ea_y_or[i] - 128 + 8 || ea_y[i] > ea_y_or[i] - 8) {
            //  減速
            vy /= 2;
          }
          if (vy < 0) {
            ea_y[i] += vy;
            if (ea_y[i] <= ea_y_or[i] - 128) {
              ea_y[i] = ea_y_or[i] - 128;
              ea_vy[i] = 4;
            }
          } else {
            ea_y[i] += vy;
            if (ea_y[i] >= ea_y_or[i]) {
              ea_y[i] = ea_y_or[i];
              ea_vy[i] = -4;
            }
          }
          ea_x[i] += ea_vx[i];

          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);

          if (ea_x[i] - view_x < -31 || ea_x[i] - 32 - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  パターン
          if (ac_4 <= 1) {
            os_g.drawImage(wing_simg[0], ea_x[i] - 34 - view_x, ea_y[i] - ea_vy[i] - view_y);
            os_g.drawImage(wing_simg[2], ea_x[i] + 30 - view_x, ea_y[i] - ea_vy[i] - view_y);
          } else {
            os_g.drawImage(wing_simg[1], ea_x[i] - 34 - view_x, ea_y[i] - ea_vy[i] - view_y);
            os_g.drawImage(wing_simg[3], ea_x[i] + 30 - view_x, ea_y[i] - ea_vy[i] - view_y);
          }

          break;
          //  フライングアイテムボックス　左移動
        case 1162:

          if (my_x >= ea_x[i] - 15 && my_x + 15 <= ea_x[i] + 31 &&
            my_y > ea_y[i] && my_y <= ea_y[i] + 31) {
            ea_y[i] = ea_y[i] - 32;
            ea_con[i] = 1170 + ea_c1[i];
            ap.setYukaPattern(ea_yuka1[i], 41, 0);
            ap.playSound(14);
            break;
          }
          //  移動
          vy = ea_vy[i]; //  速度
          if (ea_y[i] < ea_y_or[i] - 128 + 8 || ea_y[i] > ea_y_or[i] - 8) {
            //  減速
            vy /= 2;
          }
          if (vy < 0) {
            ea_y[i] += vy;
            if (ea_y[i] <= ea_y_or[i] - 128) {
              ea_y[i] = ea_y_or[i] - 128;
              ea_vy[i] = 4;
            }
          } else {
            ea_y[i] += vy;
            if (ea_y[i] >= ea_y_or[i]) {
              ea_y[i] = ea_y_or[i];
              ea_vy[i] = -4;
            }
          }
          ea_x[i] -= ea_vx[i];

          if (ea_x[i] + 31 <= 1) {
            ea_con[i] = 0;
          }

          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);

          if (ea_x[i] + 31 - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  パターン
          if (ac_4 <= 1) {
            os_g.drawImage(wing_simg[0], ea_x[i] - 30 - view_x, ea_y[i] - ea_vy[i] - view_y);
            os_g.drawImage(wing_simg[2], ea_x[i] + 34 - view_x, ea_y[i] - ea_vy[i] - view_y);
          } else {
            os_g.drawImage(wing_simg[1], ea_x[i] - 30 - view_x, ea_y[i] - ea_vy[i] - view_y);
            os_g.drawImage(wing_simg[3], ea_x[i] + 34 - view_x, ea_y[i] - ea_vy[i] - view_y);
          }

          break;
          //  フライングアイテムボックス　壁反転
        case 1163:

          if (my_x >= ea_x[i] - 15 && my_x + 15 <= ea_x[i] + 31 &&
            my_y > ea_y[i] && my_y <= ea_y[i] + 31) {
            ea_y[i] = ea_y[i] - 32;
            ea_con[i] = 1170 + ea_c1[i];
            ap.setYukaPattern(ea_yuka1[i], 41, 0);
            ap.playSound(14);
            break;
          }
          //  移動
          vy = ea_vy[i]; //  速度
          if (ea_y[i] < ea_y_or[i] - 128 + 8 || ea_y[i] > ea_y_or[i] - 8) {
            //  減速
            vy /= 2;
          }
          if (vy < 0) {
            ea_y[i] += vy;
            if (ea_y[i] <= ea_y_or[i] - 128) {
              ea_y[i] = ea_y_or[i] - 128;
              ea_vy[i] = 4;
            }
          } else {
            ea_y[i] += vy;
            if (ea_y[i] >= ea_y_or[i]) {
              ea_y[i] = ea_y_or[i];
              ea_vy[i] = -4;
            }
          }
          ea_x[i] += ea_vx[i];
          if (ea_vx[i] < 0) {
            vx = ap.getMapchip(Math.floor(ea_x[i] / 32) - 1, Math.floor(ea_y[i] / 32) - 10);
            if (vx >= 18 || vx < 0) {
              ea_x[i] = Math.floor(ea_x[i] / 32) * 32 + 32;
              ea_vx[i] = 2;
            }
          } else {
            vx = ap.getMapchip(Math.floor((ea_x[i] + 31) / 32) - 1, Math.floor(ea_y[i] / 32) - 10);
            if (vx >= 18 || vx < 0) {
              ea_x[i] = Math.floor((ea_x[i] + 31) / 32) * 32 - 32;
              ea_vx[i] = -2;
            }
          }
          ap.setYukaPosition(ea_yuka1[i], ea_x[i], ea_y[i]);

          if (ea_x[i] + 31 - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  パターン
          if (ac_4 <= 1) {
            os_g.drawImage(wing_simg[0], ea_x[i] - 32 - ea_vx[i] - view_x, ea_y[i] - ea_vy[i] - view_y);
            os_g.drawImage(wing_simg[2], ea_x[i] + 32 - ea_vx[i] - view_x, ea_y[i] - ea_vy[i] - view_y);
          } else {
            os_g.drawImage(wing_simg[1], ea_x[i] - 32 - ea_vx[i] - view_x, ea_y[i] - ea_vy[i] - view_y);
            os_g.drawImage(wing_simg[3], ea_x[i] + 32 - ea_vx[i] - view_x, ea_y[i] - ea_vy[i] - view_y);
          }

          break;
          //>>1up
        case 1170:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.setMyLeft(ap.getMyLeft() + 1);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 59, 0);

          break;
          //  >>コイン
        case 1171:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.playSound(7);
          }
          ea_c2[i] = 90 + Math.floor(ac_8 / 2);
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, ea_c2[i], 0);

          break;
          //>>ファイアボール
        case 1172:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.equipFire(1);
            ap.playSound(8);

          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 42, 0);

          break;
          //>>バリア
        case 1173:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.equipBarrier(150);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 43, 0);

          break;
          //>>タイム
        case 1174:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.setTimeLimit(ap.getTimeLimit() + 30);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 44, 0);

          break;
          //>>ジェット
        case 1175:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.equipJet(80);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 45, 0);

          break;
          //>>ヘルメット
        case 1176:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.addMyTokugi(1);
            ap.playSound(8);

          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 46, 0);

          break;
          //>>しっぽ
        case 1177:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.equipTail(1);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 47, 0);

          break;
          //>>ドリル
        case 1178:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.addMyTokugi(2);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 48, 0);

          break;
          //>>グレネード
        case 1179:

          if (ea_x[i] - view_x < -31 || ea_x[i] - view_x > 519 ||
            ea_y[i] - view_y < -31 || ea_y[i] - view_y > 319) {
            ea_pt[i] = 0;
            break;
          }

          //  自分との当たり判定
          if (my_x + 15 >= ea_x[i] && my_x + 15 <= ea_x[i] + 31 &&
            my_y + 15 >= ea_y[i] && my_y + 15 <= ea_y[i] + 31) {

            ea_con[i] = 0;
            ap.addScore(5);
            ap.equipGrenade(1);
            ap.playSound(8);
          }
          ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, 49, 0);

          break;
      }
    }
  }

  //  拡張仕掛け  描画
  function drawExtendAth(os_g, ap, view_x, view_y) {
    for (var i = 0; i <= ea_id_max; i++) {
      if (ea_con[i] == 0 || ea_pt[i] == 0) continue;
      ap.setOffscreenColor(255, 0, 0, 255);

      if (ea_type[i] == 0) {
        //  パターン画像から表示
        ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, ea_pt[i], ea_ptr[i]);
      } else if (ea_type[i] == 1) {
        //  拡張パターン画像から表示
        os_g.drawImage(ea_pt2[i], ea_x[i] - view_x, ea_y[i] - view_y);
      } else if (ea_type[i] == 2) {
        // パターン画像から長方形で表示（2*1）

      }
    }
  }

  //  スターリング着地
  function mmy_Str(ap) {
    if (mmy_str_yc == 1) {
      if (rgc == 1) {
        ap.setMyWait(2, 109, 0);
        ap.playSound(9);
        mmy_str_yc = 0;
      }
    }

  }
  //  スピン攻撃
  function mmy_Spin(ap) {
    key = ap.getKeyCode();
    myX = ap.getMyX();
    myY = ap.getMyY();
    myYr = ap.getMyYReal();
    myXr = ap.getMyXReal();
    //  Xキーが押された
    if (key == 88 && !mmySpin_spinFlag) {
      if (mmy_str_c == 0) {
        mmySpin_spinFlag = 1;
      }
    }

    if (mmySpin_spinFlag) {
      if (mmySpin_spinFlag == 1) {
        ap.playSound(12);
      }
      //  左右の敵を倒す
      ap.destroyEnemy(myXr + 20, myYr, 20, 20);
      ap.destroyEnemy(myXr - 20, myYr, 20, 20);
      //  アニメーション
      if (agc == 0) {
        ap.setMyObjectImage(mmySpin_simg[mmySpin_spinFlag - 1], 0, 0);
      } else {
        ap.setMyObjectImage(mmySpin_simg[mmySpin_spinFlag + 3], 0, 0);
      }
      mmySpin_spinFlag++;
      //  アニメーションリセット
      if (mmySpin_spinFlag > 5) {
        mmySpin_spinFlag = 0;
        ap.setMyObjectImage(null, 0, 0);
        ap.resetKeyCode();
      }

    }

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

  //  反重力　スイッチ
  //  trueでオン
  function mmy_AG(ap, bl) {
    if (bl == true && agc == 0) {
      agc = 1;
      mmyAg_def = false;
      ap.setYukaType(agy1, 1);
    } else if (bl == false && agc != 0) {
      agc = 0;
      ap.setYukaType(agy1, 2);
      ap.setMyObjectImage(null, 0, 0);
    }

    mmyAg_pressed = false;
    ap.setEnemyPress(bl ? 2 : 1);
  }
  //  反重力　動作
  function mmy_AntiGravity(os_g, ap) {
    j_count++;

    //  agcカウンタについて
    //  0 - 通常重力
    //  1 - 反重力（空中時）
    //  2 - 上地面にいるとき
    //  3 - ジャンプした時

    //  使用メソッドの宣言
    key = ap.getKeyCode();
    var ag_h = ap.getMapchip(myX, myY - 1);
    var ag_l = ap.getMapchip(myX - 1, myY);
    var ag_r = ap.getMapchip(myX + 1, myY);
    getp = ap.getMyObjectPattern();
    myX = ap.getMyX();
    myY = ap.getMyY();
    myYr = ap.getMyYReal();
    myXr = ap.getMyXReal();
    rgc = ap.isRideGround();
    muki = ap.getMyDirection();
    gmoc = ap.getMyObjectCondition();

    if (gmoc >= 200) {
      ap.setMyObjectImage(null, 0, 0);
      mmy_AG(ap, false);
    }
    //  デバッグ用、Aキーで反重力モード
    /*
    if (key == 65) {
      if (agc == 0) {
        agc = 1;
        ap.setYukaType(agy1, 1);
        ap.resetKeyCode();
      } else {
        agc = 0;
        ap.setYukaType(agy1, 2);
        ap.setMyObjectImage(null, 0, 0);
        ap.resetKeyCode();
      }
    }
    */

    //ジャンプした時
    if (agc == 3) {
      //スピン中は描画しない
      if (mmySpin_spinFlag == 0) {
        if (muki == 0) {
          ap.setMyObjectImage(ag_imgL[1], 0, 0);
        }
        if (muki == 1) {
          ap.setMyObjectImage(ag_imgR[1], 0, 0);
        }
      }
      ap.setYukaPosition(agy1, myX * 32 + 32, (myY + 10) * 32 + 35, myX * 32 + 64, (myY + 10) * 32 + 35);
      ap.setYukaType(agy1, 2);
      ap.setMyVY(160);
      ap.resetKeyCode();
      if (j_count == 6) {
        ap.setYukaType(agy1, 1);
        agc = 1;
        ap.resetKeyCode();
      }
    }

    //  空中にいる時
    if (agc == 1) {
      ap.resetKeyCode();
      ap.setMyVY(-165);

      // 反重力踏み
      if (ap.destroyEnemy(myXr + ap.getMyVX() / 10, myYr - 16, 32, 16)) {
        agc = 4;
        j_count = 0;

        mmyAg_pressed = true;
        mmyAg_preVX = ap.getMyVX();
      }

      if (ag_h == 20 || ag_h == 21 || ag_h == 22 || ag_h == 23 || ag_h == 24 || ag_h == 25 || ag_h == 26 || ag_h == 27 || ag_h == 28 || ag_h == 29 || ag_h == 31 || ag_h == 40 || ag_h == 41 || ag_h == 50 || ag_h == 60 || ag_h == 61 || ag_h == 62 || ag_h == 63 || ag_h == 64 || ag_h == 65 || ag_h == 66 || ag_h == 67 || ag_h == 69 || ag_h == 180 || ag_h == 181 || ag_h == 182 || ag_h == 183 || ag_h == 184 || ag_h == 185 || ag_h == 190 || ag_h == 191 || ag_h == 192 || ag_h == 193 || ag_h == 194 || ag_h == 195) {
        agc = 2;
      } else {
        ap.setMyYReal(myYr - 1);
      }

      if (myYr < 288) {
        ap.setMyObjectPattern(0);
        ap.setMyMiss(3);
      }
    }

    // 踏みつけている時
    if (agc == 4) {
      if (j_count > 3) {
        ap.setMyVX(mmyAg_preVX);
        agc = 3;
        j_count = 0;
      } else {
        ap.setMyWait(1, 0, muki);
      }
    }

    if (agc != 2 && mmyAg_pressed) {
      if (muki == 0) {
        ap.setMyObjectImage(ag_imgL[9], 0, 0);
      }
      if (muki == 1) {
        ap.setMyObjectImage(ag_imgR[9], 0, 0);
      }
    }

    //地面に張り付いた時
    if (agc == 2) {
      mmyAg_pressed = false;

      if (key == 32 || key == 90) {
        j_count = 0;
        ap.resetKeyCode();
        agc = 3;
      }
      //  頭上に地面があるか
      if (ag_l == 20 || ag_l == 21 || ag_l == 22 || ag_l == 23 || ag_l == 24 || ag_l == 25 || ag_l == 26 || ag_l == 27 || ag_l == 28 || ag_l == 29 || ag_l == 31 || ag_l == 40 || ag_l == 41 || ag_l == 50 || ag_l == 60 || ag_l == 61 || ag_l == 62 || ag_l == 63 || ag_l == 64 || ag_l == 65 || ag_l == 66 || ag_l == 67 || ag_l == 69 || ag_l == 180 || ag_l == 181 || ag_l == 182 || ag_l == 183 || ag_l == 184 || ag_l == 185 || ag_l == 190 || ag_l == 191 || ag_l == 192 || ag_l == 193 || ag_l == 194 || ag_l == 195) {
        ap.setYukaPosition(agy1, myX * 32 + 32, (myY + 10) * 32 + 32, myX * 32 + 63, (myY + 10) * 32 + 32);
      } else if (ag_r == 20 || ag_r == 21 || ag_r == 22 || ag_r == 23 || ag_r == 24 || ag_r == 25 || ag_r == 26 || ag_r == 27 || ag_r == 28 || ag_r == 29 || ag_r == 31 || ag_r == 40 || ag_r == 41 || ag_r == 50 || ag_r == 60 || ag_r == 61 || ag_r == 62 || ag_r == 63 || ag_r == 64 || ag_r == 65 || ag_r == 66 || ag_r == 67 || ag_r == 69 || ag_r == 180 || ag_r == 181 || ag_r == 182 || ag_r == 183 || ag_r == 184 || ag_r == 185 || ag_r == 190 || ag_r == 191 || ag_r == 192 || ag_r == 193 || ag_r == 194 || ag_r == 195) {
        ap.setYukaPosition(agy1, myX * 32 + 33, (myY + 10) * 32 + 32, myX * 32 + 64, (myY + 10) * 32 + 32);
      } else {
        ap.setYukaPosition(agy1, myX * 32 + 33, (myY + 10) * 32 + 32, myX * 32 + 63, (myY + 10) * 32 + 32);
      }
      if (mmySpin_spinFlag == 0) {
        //  主人公のイメージセット
        switch (getp) {
          case 100:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[0], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[0], 0, 0);
            }
            break;
          case 101:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[1], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[1], 0, 0);
            }
            break;
          case 102:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[2], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[2], 0, 0);
            }
            break;
          case 103:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[3], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[3], 0, 0);
            }
            break;
          case 104:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[4], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[4], 0, 0);
            }
            break;
          case 105:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[5], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[5], 0, 0);
            }
            break;
          case 106:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[6], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[6], 0, 0);
            }
            break;
          case 107:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[7], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[7], 0, 0);
            }
            break;
          case 108:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[8], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[8], 0, 0);
            }
            break;
          case 109:
            if (muki == 0) {
              ap.setMyObjectImage(ag_imgL[9], 0, 0);
            }
            if (muki == 1) {
              ap.setMyObjectImage(ag_imgR[9], 0, 0);
            }
            break;

        }
      }
      if (ag_h == 0) {
        agc = 1;
      }
    }


  }


  //  公開メソッド
  return {
    setPluginManager: function(pm) {
      //  プラグインマネージャーをセット
      plugin_manager = pm;
      //  拡張仕掛けを使う
      plugin_manager.setExtendAthleticEnable(true);
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
    putAthleticEvent: function(code, chip_x, chip_y, ap) {
      //  拡張仕掛け設置

      //  ピクセル座標
      var px = (chip_x + 1) * 32;
      var py = (chip_y + 10) * 32;

      //  拡張敵を設置する
      setExtendAth(code, px, py, ap);
    },
    gameEvent: function(os_g, ap, view_x, view_y) {
      //  ゲーム中
      myX = ap.getMyX();
      myY = ap.getMyY();

      ac_4++;
      if (ac_4 > 3) ac_4 = 0;
      ac_8++;
      if (ac_8 > 7) ac_8 = 0;

      //  拡張仕掛け　動作
      moveExtendAth(os_g, ap, view_x, view_y);
      //  拡張仕掛け　描画
      drawExtendAth(os_g, ap, view_x, view_y);

      //  スピン攻撃
      if (mmySpin_spinUse == true) {
        //mmy_Spin(ap);
      }

      //  HP
      if (mmyHp_hpUse == true) {
        mmy_Hp(os_g, ap);
      }

      mmy_AntiGravity(os_g, ap);
      if (mmyAg_def == true) {
        mmy_AG(ap, true);
      }

      mmy_Str(ap);

    }
  };
})();
