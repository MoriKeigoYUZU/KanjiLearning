<template>
    <div>
        <canvas width="320" height="320" class="canvas" id="canvas"></canvas>
        <v-btn depressed small color="primary" @click="save">保存</v-btn>
<!--        <button @click="save">save</button>-->
    </div>
</template>

<script>
    export default {
        name: "MyCanbas",

        mounted(){
            console.log(this.$el)
            this.MyCanvas()
        },

        methods: {

            save: function () {

                const nowContext = document.getElementById("canvas");
                // console.log(nowContext)
                const nowContextData = nowContext.getContext('2d')

                // console.log(nowContextData);

                let imageData = nowContextData.getImageData(0, 0, 64, 64);
                console.log(imageData.data)


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
                console.log(formated);
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
                    context.lineWidth = rect.width / 23;
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
                        for (var i = 0; i < data.length; i+=4) {
                            let p = (data[i] == 0 && data[i+1] == 0 && data[i+2] == 0) ? 0 : 1;
                            tmp.push(p);
                        }
                        let array = [];
                        let formated = []
                        for (var i = 0; i < tmp.length; i++) {
                            if (i != 0 && i%canvas.width == 0) {
                                formated.push(array);
                                array = [];
                            }
                            array.push(tmp[i]);
                        }
                        formated.push(array);
                        $.ajax({
                            url:'./setjson.php',
                            type:'POST',
                            data:{
                                'json': JSON.stringify(formated)
                            }
                        })

                        // Ajaxリクエストが成功した時発動
                        .done( (json) => {
                            console.log(JSON.parse(json));
                        })

                        // Ajaxリクエストが失敗した時発動
                        .fail( (data) => {
                            console.log('fail');
                        })

                        // Ajaxリクエストが成功・失敗どちらでも発動
                        .always( (data) => {

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
</style>