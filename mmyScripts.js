//  プラグイン  mmyScripts  Version 1.13-k
//  2018/2/20 by Tex
//  http://tex1.symphonic-net.com/
//
//  2018/2/26 by kururin
//
//  実装：スピン攻撃、HP表示、反重力、スターリング
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

  //  拡張仕掛け用変数
  var ea_id_max = 0; // ＩＤ最大値
  var ea_con = []; //  状態
  var ea_x = []; //  Ｘ座標
  var ea_y = []; //  Ｙ座標
  var ea_pt = []; //  パターン
  var ea_pt2 = []; //  拡張パターン
  var ea_ptr = []; //  パターン反転
  var ea_id = []; //  ＩＤ
  var ea_type = []; // 1でパターン画像、2で追加パターン

  //  起動時の初期化
  function initLoad(ap) {

    //  イベントの設定
    plugin_manager.addEventListener("gamestart", mmyScripts.gameStartEvent);
    plugin_manager.addEventListener("game", mmyScripts.gameEvent);
    plugin_manager.addEventListener("putathletic", mmyScripts.putAthleticEvent);

    //  パターン画像を元に拡張パターンを作成
    var mmy_imgPtn = ap.getParamValue("filename_pattern");
    mmy_sid = ap.newChipImage(mmy_imgPtn, 32, 32, 10, 27);
    ap.makeReverseChipImage(mmy_sid);

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


  }

  //  ゲーム開始時の初期化
  function initGameStart(ap) {

    //  仕掛けの初期化
    ea_id_max = 0;
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
      ea_pt[i] = 0;
      ea_pt2[i] = 0;
      ea_ptr[i] = 0;
      ea_id[i] = 1;
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
      }
      if (i > ea_id_max) ea_id_max = i;
      break;
    }
  }
  //  拡張仕掛け　動作
  function moveExtendAth(ap, view_x, view_y) {
    //  自分
    var my_x = ap.getMyXReal(); //  Ｘ座標
    var my_y = ap.getMyYReal(); //  Ｙ座標
    var my_x_block = ap.getMyX();
    var my_y_block = ap.getMyY();
    muki = ap.getMyDirection();
    key = ap.getKeyCode();
    rgc = ap.isRideGround();


    for (var i = 0; i <= ea_id_max; i++) {
      if (ea_con[i] == 0) continue;
      switch (ea_con[i]) {
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
              if(mmy_str_c == 0){
          		ap.setMyWait(1,101,muki);
          		ap.playSound(14);
          		mmy_str_c = 1;
          		}
          		ap.setMyPosition(str_chip_x,str_chip_y);
          		if(key == 40){
          		   if(agc == 0){ap.setMyYReal(my_y+20);}
                 else if(agc == 1){ap.setMyYReal(my_y-20);}
          			ap.resetKeyCode();
          			mmy_str_c = 0;
                mmy_str_yc = 0;
          		}else if(key == 32 || key == 90){
                mmy_AG(ap, false);
          			mmy_str_c = 0;

          			ap.setMyYReal(my_y-10);
                switch (ea_id[i]){
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


      }
    }
  }

  //  拡張仕掛け  描画
  function drawExtendAth(os_g, ap, view_x, view_y) {
    for (var i = 0; i <= ea_id_max; i++) {
      if (ea_con[i] == 0 || ea_pt[i] == 0) continue;
      ap.setOffscreenColor(255,0,0,255);

      if (ea_type[i] == 0) {
        //  パターン画像から表示
        ap.drawPattern(ea_x[i] - view_x, ea_y[i] - view_y, ea_pt[i], ea_ptr[i]);
      } else {
        //  拡張パターン画像から表示
        os_g.drawImage(ea_pt2[i], ea_x[i] - view_x, ea_y[i] - view_y);
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
      if(mmy_str_c == 0){mmySpin_spinFlag = 1;}
    }

    if (mmySpin_spinFlag) {
      if (mmySpin_spinFlag == 1) {
        ap.playSound(12);
      }
      //  左右の敵を倒す
      ap.destroyEnemy(myXr + 20, myYr, 20, 20);
      ap.destroyEnemy(myXr - 20, myYr, 20, 20);
      //  アニメーション
      if(agc == 0){ap.setMyObjectImage(mmySpin_simg[mmySpin_spinFlag - 1], 0, 0);}
      else {ap.setMyObjectImage(mmySpin_simg[mmySpin_spinFlag + 3], 0, 0);}
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

    if(gmoc >= 200){
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
      if(mmySpin_spinFlag == 0){
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

      if(myYr < 288){
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
      if(mmySpin_spinFlag == 0){
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

      //  拡張仕掛け　動作
      moveExtendAth(ap, view_x, view_y);
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
