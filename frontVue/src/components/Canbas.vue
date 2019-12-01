<template>
    <v-container class="grey lighten-5">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <canvas width="320" height="320" class="canvas" id="canvas"></canvas>

                    <v-col>
                        <v-btn class="ma-2" depressed small color="primary" @click="save()" large value="Click">保存</v-btn>
                        <!-- <v-btn class="ma-2" depressed small color="error" @click="MyCanvas()" large href="/KanjiLearning">リセット</v-btn> -->
                        <v-btn class="ma-2" depressed small color="error" id="reset" large>リセット</v-btn>
                    </v-col>
            </v-col>
            <v-row>
                <v-col cols = "1"></v-col>
                <v-col>
                    <v-row><span class = "title font-weight-bold">{{moji[0]}}</span></v-row>
                    <v-row><v-col></v-col></v-row>
                    <v-row>
                            <div class="display-4"> {{kanji[number]}} </div>
                            <v-col cols = "1"></v-col>
                        <v-col><div class = "headline">{{moji[1]}}{{kunyomi[number]}}</div><div class = "headline ">{{moji[2]}}{{onyomi[number]}}</div><div class = "headline">{{moji[3]}}{{kakusu[number]}}</div></v-col>
                    </v-row>
                    <v-col></v-col>
                    <v-row>
                        <v-col cols ="1"></v-col>
                    <span v-for="n in 5">
                        <v-btn min-height="100px" min-width ="100px" tile outlined color="burakku" @click="choiceKanji(n)"><span class = "display-3 font-weight-black">{{ kanji[n-1] }}</span></v-btn>
                    </span>
                    <!-- <p id = "choice">dvda</p> -->
                    </v-row>
                </v-col>
                <v-col cols="2"></v-col>
            </v-row>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "MyCanbas",

        data() {
            return {
                tmp: "",
                msg: "",
                object: "",
                kanji: "",
                onyomi: "",
                kunyomi: "",
                kakusu: "",
                number: "0",
                moji: "",
            };
        },

        mounted() {
            console.log(this.$el)
            this.MyCanvas()
        },

        methods: {

            choiceKanji(num) {
                console.log(num);
                this.number = num - 1;
            },

            predictKanji(){
                const POST_URL = process.env.VUE_APP_URL_BASE + "kanji_search.py";
                let params = new URLSearchParams();
                params.append("object", JSON.stringify(this.object));
                //ここにURL指定。

                axios.post(POST_URL, params)
                    .then(response => {
                        this.kanji = response.data.kanji;
                        this.onyomi = response.data.onyomi;
                        this.kunyomi = response.data.kunyomi;
                        this.kakusu = response.data.kakusu;
                    }).catch(err => {
                    console.log('err:', err);
                });
            },

            clearCanvas: function () {
                //後で書く
            },


            save: function () {

                this.moji=["あなたの書いた字は、","訓読み :","音読み :","画数　 :"]

                const nowContext = document.getElementById("canvas");
                // console.log(nowContext)
                const nowContextData = nowContext.getContext('2d');


                let imageData = nowContextData.getImageData(0, 0, 320, 320);


                let data = imageData.data;
                let tmp = [];

                for (var i = 0; i < data.length; i += 4) {
                    let p = (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) ? 0 : 255;
                    tmp.push(p);
                }

                let object = [];
                let formated = [];
                for (var i = 0; i < tmp.length; i++) {
                    // if (i != 0 && i % 64 == 0) {
                    if (i != 0 && i % 320 == 0) {
                        formated.push(object);
                        object = [];
                    }
                    object.push(tmp[i]);
                }
                formated.push(object);


                //これを送る
                console.log(formated);


                console.log("fds")
                var tbl = new Array(64);
                for(let y = 0; y < 64; y++) {
                    tbl[y] = new Array(64).fill(255);
                }

                var judgment = 0;
                for(let i = 0 ; i < 64 ; i++){
                    for(let j = 0 ; j < 64 ; j++){
                        for(let mi = (((i + 1) * 5) - 5) ; mi < ((i + 1) * 5) ; mi++){
                            for(let mj = (((j + 1) * 5) - 5) ; mj < ((j + 1) * 5) ; mj++){
                                if(formated[mi][mj] === 0){
                                    tbl[i][j] = 0;
                                }
                            }
                        }
                    }
                }
                this.object = tbl;
                console.log(tbl);

                this.predictKanji()
            },

            //Canvas部分
            MyCanvas() {
                'use strict'
                // HTMLページを読み込み次第startCanvas()を実行
                window.addEventListener('load', () => {
                    setupCanvas();
                }, false);

                // Canvas要素に漢字を描けるようにするためのメソッド
                let setupCanvas = () => {
                    // Canvasがサポートされていない場合
                    if (!document.createElement('canvas').getContext) return;
                    let canvas = document.getElementsByTagName('canvas');
                    for (var i = 0; i < canvas.length; i++) {
                        fillWhite(canvas[i]);
                        // 基準線を引く
                        drawDottedLine(canvas[i]);
                        // 鉛筆の初期化
                        initPencil(canvas[i]);
                        // canvas上で描くためのListenerなどの設定

                        setupListener(canvas[i]);
                    }
                }

                // 漢字を書く枠内にグレーの基準線を描くメソッド
                let drawDottedLine = (canvas) => {
                    let context = canvas.getContext('2d');
                    context.beginPath();
                    context.strokeStyle = '#999';
                    context.moveTo(canvas.width / 2, 0);
                    for (var i = 0; i < canvas.height; i += 4) {
                        context.lineTo(canvas.width / 2, i + 2);
                        context.moveTo(canvas.width / 2, i + 4);
                    }
                    context.moveTo(0, canvas.height / 2);
                    for (var i = 0; i < canvas.width; i += 4) {
                        context.lineTo(i + 2, canvas.height / 2);
                        context.moveTo(i + 4, canvas.height / 2);
                    }
                    context.stroke();
                }

                let fillWhite = (canvas) => {
                    let context = canvas.getContext('2d');
                    context.fillStyle = 'rgb(255, 255, 255, 255)';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                }


                /*
                リスナーなどの設定
                canvasの動き方など、アプリケーションとしての機能は全てこの中に
                */
                let setupListener = (canvas) => {
                    let context = canvas.getContext('2d');
                    let rect = canvas.getBoundingClientRect();
                    let mousePressed = false;
                    let posOrigin = {x: 0, y: 0};
                    // マウスが押された時
                    window.addEventListener('mousedown', () => {
                        posOrigin.x = event.clientX - rect.left;
                        posOrigin.y = event.clientY - rect.top
                        mousePressed = true;
                    }, false);
                    // マウスが離された時
                    window.addEventListener('mouseup', () => {
                        mousePressed = false;
                    }, false);
                    // canvas上でマウスが押されている状態で動かした時
                    canvas.addEventListener('mousemove', (event) => {
                        if (mousePressed) {
                            let posX = event.clientX - rect.left;
                            let posY = event.clientY - rect.top
                            context.moveTo(posOrigin.x, posOrigin.y);
                            context.lineTo(posX, posY);
                            context.stroke();
                            posOrigin.x = posX;
                            posOrigin.y = posY;
                        }
                    }, false);

                    var reset = document.getElementById('reset');

                    // ダブルクリックした時
                    reset.addEventListener('click', () => {
                        canvas.width = canvas.width;
                        fillWhite(canvas);
                        drawDottedLine(canvas);
                        initPencil(canvas);
                    },false);
                }

                // 鉛筆の太さや色などの初期化を行うメソッド
                let initPencil = (canvas) => {
                    let context = canvas.getContext('2d');
                    let rect = canvas.getBoundingClientRect();
                    context.beginPath();
                    context.lineWidth = rect.width / 30;
                    context.lineCap = 'round';
                    context.strokeStyle = 'rgb(0, 0, 0, 255)';
                }

                window.addEventListener('load', () => {
                    let button = document.getElementById('button');
                    button.addEventListener('click', () => {
                        let oldCanvas = document.getElementById('canvas');

                        let canvas = document.createElement('canvas');
                        canvas.width = 320;
                        canvas.height = 320;
                        // canvas.width = 64;
                        // canvas.height = 64;
                        let context = canvas.getContext('2d');
                        // 320
                        // context.drawImage(oldCanvas, 0, 0, 64, 64);
                        context.drawImage(oldCanvas, 0, 0, 320,320);

                        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);


                        let data = imageData.data;
                        let tmp = [];
                        // for (var i = 0; i < data.length; i += 4) {
                        for (var i = 0; i < data.length; i += 4) {
                            let p = (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) ? 0 : 1;
                            tmp.push(p);
                        }
                        let object = [];
                        let formated = []
                        for (var i = 0; i < tmp.length; i++) {
                            if (i != 0 && i % canvas.width == 0) {
                                formated.push(object);
                                object = [];
                            }
                            object.push(tmp[i]);
                        }
                        formated.push(object);
                        $.ajax({
                            url: './setjson.php',
                            type: 'POST',
                            data: {
                                'json': JSON.stringify(formated)
                            }
                        })

                        // Ajaxリクエストが成功した時発動
                            .done((json) => {
                                console.log(JSON.parse(json));
                            })

                            // Ajaxリクエストが失敗した時発動
                            .fail((data) => {
                                console.log('fail');
                            })

                            // Ajaxリクエストが成功・失敗どちらでも発動
                            .always((data) => {

                            });
                    }, false);
                }, false);
            }
        }
    }
</script>

<style scoped>
    .canvas {
        border: 1px solid #000;
    }

    .moji {
        font-size: 300%;
    }

    /* .checkButton {
    display: none;
    
} */

</style>