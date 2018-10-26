enchant();

window.onload = function () {
    // coreの生成
    var core = new Core(320, 320);
    // fps設定
    core.fps = 15;
    // 読み込み画像
    core.preload('img/chara1.png');
    // ロード時のキャラクターの設定
    core.onload = function () {
        // スプライトするキャラを生成
        var bear = new Sprite(32, 32);
        // 使用するキャラチップ
        bear.image = core.assets['img/chara1.png'];
        // キャラの初期位置
        bear.x = 0;
        bear.y = 0;
        core.rootScene.addChild(bear);
        bear.frame = 1;
        // 右に動き続けるアニメーション
        bear.on('enterframe', function () {
            this.x += 5;
            // 使用するコマ数
            this.frame = this.age % 3;
            // 画面からはみ出た場合に逆方向から出るようにする
            if (this.x > 320) this.x = 0;
            if (this.y > 320) this.y = 0;
            if (this.y < 0) this.y = 320;
        });
        // 操作できるようにする
        bear.on('enterframe', function () {
            // core.inputが十字キー操作に対応
            if (core.input.left) this.x -= 5;
            if (core.input.right) this.x += 5;
            if (core.input.up) this.y -= 5;
            if (core.input.down) this.y += 5;
        });
        bear.on('touchstart', function () {
            // タッチ開始時にキャラを消す
            core.rootScene.removeChild(this);
        });
        core.rootScene.on('touchstart', function (e) {
            // キャラの位置情報をタッチした座標に置き換え表示する
            bear.x = e.x;
            bear.y = e.y;
        });

        // 時間経過のラベルを表示する
        var label = new Label();
        // ラベルのスタイルを定義
        label.x = 270;
        label.y = 5;
        label.color = '#000';
        label.font = '20px "Arial"';
        label.text = '0';
        label.on('enterframe', function () {
            label.text = (core.frame / core.fps).toFixed(2);
        });
        core.rootScene.addChild(label);

        // クラスの定義方法
        // var Kuma = Class.create(Sprite, {
        //     initialize: function (x, y) {
        //         Sprite.call(this, 32, 32);
        //         this.x = x;
        //         this.y = y;
        //         this.image = core.assets['./img/chara1.png'];
        //         this.on('enterframe', function () {
        //             this.x += 5;
        //         });
        //         core.rootScene.addChild(this);
        //     }
        // });
        // var higuma = new Kuma(0, 100),
        //     sirokuma = new Kuma(200, 200);
    }
    // 動作実行
    core.start();
};