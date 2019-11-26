<template>
    <v-container class="grey lighten-5">
        <!--        {{msg}}-->
        <v-row>
            <v-col>
                <canvas width="320" height="320" class="canvas" id="canvas"></canvas>
            </v-col>
            <v-col>
                <v-row>
                    <v-btn depressed small color="primary" @click="save(); dddd()" large value="Click">保存</v-btn>
                </v-row>
                <v-row>
                    <v-btn depressed small color="error" large href="/KanjiLearning">リセット</v-btn>
                </v-row>
            </v-col>

            <v-row>
                <v-col cols="2"></v-col>
                <v-col>
<!--                    <div class="moji">-->
                    <div id="text1"></div>
                    <br>
                        <div id="text2" class="moji"></div>
                    <br>
                    <div id="text3"></div>
<!--                    </div>-->
                </v-col>

            </v-row>
            <!--            <v-col cols="3"></v-col>-->
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
            };
        },

        mounted() {
            console.log(this.$el)
            this.MyCanvas()
        },

        methods: {

            // dddd: function (){
            //
            //
            //     const POST_URL = "cgi-bin/.php";
            //     const params =
            //     //ここにURL指定。
            //
            //     axios.post(POST_URL, params)
            //         .then(response => {
            //             this.msg = response.data;
            //         }).catch(err => {
            //         console.log('err:', err);
            //         this.msg = err;
            //     });
            // },

            clearCanvas: function () {
                //後で書く
            },

            save: function () {

                var text1 = document.getElementById("text1");
                text1.innerHTML = "<p><h1>あなたが書いた字は</h1></p><center></center>";

                var text2 = document.getElementById("text2");
                text2.innerHTML = "<center><h1>木</h1></center>";

                var text3 = document.getElementById("text3");
                text3.innerHTML = "<h1 align='right'>です。</h1>";

                const nowContext = document.getElementById("canvas");
                // console.log(nowContext)
                const nowContextData = nowContext.getContext('2d')

                // console.log(nowContextData);

                let imageData = nowContextData.getImageData(0, 0, 64, 64);
                // console.log(imageData.data)


                let data = imageData.data;
                let tmp = [];
                for (var i = 0; i < data.length; i += 4) {
                    let p = (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) ? 1 : 0;
                    tmp.push(p);
                }
                let array = [];
                let formated = []
                for (var i = 0; i < tmp.length; i++) {
                    if (i != 0 && i % 64 == 0) {
                        formated.push(array);
                        array = [];
                    }
                    array.push(tmp[i]);
                }
                formated.push(array);

                //これを送る
                console.log(formated);


                const POST_URL = "hoge"; // この変数に送り先のURLを代入
                // 送るjson
                const params = {
                    // formatedには文字の０１データが二次元配列ではいってる
                    mojidata: formated
                };
                axios.post(POST_URL, params)
                    .then(response => {
                        this.msg = response.data;
                    }).catch(err => {
                    console.log('err:', err);
                });


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

                    // ダブルクリックした時
                    canvas.addEventListener('dblclick', () => {
                        canvas.width = canvas.width;
                        fillWhite(canvas);
                        drawDottedLine(canvas);
                        initPencil(canvas);
                    });
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
                        canvas.width = 64;
                        canvas.height = 64;
                        let context = canvas.getContext('2d');
                        context.drawImage(oldCanvas, 0, 0, 64, 64);

                        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);


                        let data = imageData.data;
                        let tmp = [];
                        for (var i = 0; i < data.length; i += 4) {
                            let p = (data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0) ? 0 : 1;
                            tmp.push(p);
                        }
                        let array = [];
                        let formated = []
                        for (var i = 0; i < tmp.length; i++) {
                            if (i != 0 && i % canvas.width == 0) {
                                formated.push(array);
                                array = [];
                            }
                            array.push(tmp[i]);
                        }
                        formated.push(array);
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

</style>