<template>

    <v-container class="grey lighten-5">
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <h1>漢字ラーニング(漢字手書き検索)</h1>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <h2>✎枠内に手書きで漢字をかいてください。書き終えたら、完了をおしてください。
                </h2>
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row><v-col></v-col></v-row>
        <v-row>
            <MyCanvas></MyCanvas>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-btn outline large color="purple" dark to="Top">
                トップページに戻る
            </v-btn>
            <v-col cols="1"></v-col>
        </v-row>


    </v-container>
</template>

<script>
import MyCanvas from "../components/Canbas";
    import Konva from "konva";

    export default {
        name: "KanjiLearning",

        le: "#letter",

        components: {
            MyCanvas
        },

        data() {
            return {
                image_data: [],
                letter: "れ",
                bool: false,

                width: window.innerWidth,
                height: window.innerHeight,
                stage: null,
                canvas: null,
                context: null,
                drawingLayer: null,
                drawingScope: null,
                lastPointerPosition: {},
                localPos: {
                    x: 0,
                    y: 0
                },
                pos: null,
                isPaint: false
            };
        },
        mounted: function () {
            var container = this.$refs.container;
            this.stage = new Konva.Stage({
                container,
                width: this.width,
                height: this.height
            });
            this.drawingLayer = new Konva.Layer();
            this.stage.add(this.drawingLayer);

            this.canvas = this.$refs.canvas;
            this.drawingScope = new Konva.Image({
                image: this.canvas,
                x: this.width / 4,
                y: 5,
                stroke: "black"
            });
            this.drawingLayer.add(this.drawingScope);
            this.stage.draw();

            this.context = this.canvas.getContext("2d");
            this.context.lineJoin = "round";
            this.context.lineWidth = 5;

            // イベント追加
            this.drawingScope.on("mousedown", this.mousedown);
            this.stage.addEventListener("mouseup", this.mouseup);
            this.stage.addEventListener("mousemove", this.mousemove);
            this.drawingScope.on("touchstart", this.mousedown);
            this.stage.addEventListener("touchend", this.mouseup);
            this.stage.addEventListener("touchmove", this.mousemove);
        },

        methods: {
            save: function () {
                const nowContext = document.getElementsByTagName("canvas");
                console.log(nowContext);
                const nowContextData = nowContext[0].getContext("2d");

                console.log(nowContextData);

                let imageData = nowContextData.getImageData(
                    0,
                    0,
                    this.canvas.width,
                    this.canvas.height
                );

                console.log(imageData.data);

                let data = imageData.data;
                let tmp = [];
                for (var i = 0; i < data.length; i += 4) {
                    let p = data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 ? 0 : 1;
                    tmp.push(p);
                }
                let object = [];
                let formated = [];
                for (var i = 0; i < tmp.length; i++) {
                    if (i != 0 && i % this.canvas.width == 0) {
                        formated.push(object);
                        object = [];
                    }
                    object.push(tmp[i]);
                }
                formated.push(object);
                console.log(object);
                this.image_data = object;

                this.predict();
            },
            //完了押されたとき漢字出力
            countUp: function () {
                this.bool = !this.bool;
            },
            mousedown: function () {
                this.isPaint = true;

                // マウスダウン時の座標を取得しておく
                this.lastPointerPosition = this.stage.getPointerPosition();
            },
            mouseup: function () {
                this.isPaint = false;
            },
            mousemove: function () {
                if (!this.isPaint) {
                    return;
                }

                this.context.beginPath();

                this.localPos.x = this.lastPointerPosition.x - this.drawingScope.x();
                this.localPos.y = this.lastPointerPosition.y - this.drawingScope.y();

                // 描画開始座標を指定する
                this.context.moveTo(this.localPos.x, this.localPos.y);

                this.pos = this.stage.getPointerPosition();
                this.localPos.x = this.pos.x - this.drawingScope.x();
                this.localPos.y = this.pos.y - this.drawingScope.y();

                // 描画開始座標から、lineToに指定された座標まで描画する
                this.context.lineTo(this.localPos.x, this.localPos.y);
                this.context.closePath();
                this.context.stroke();
                this.drawingLayer.draw();

                this.lastPointerPosition = this.pos;
            },
            onClearCanvas: function () {
                this.context.globalCompositeOperation = "destination-out";
                this.context.fillRect(0, 0, this.width, this.height);
                this.drawingLayer.draw();

                this.$emit("on-reset");
            },
            // 現在のモードが指定されたモードと一致するかどうか
            isTargetMode: function (targetMode) {
                return this.mode === targetMode;
            }
        },
        watch: {
            // ペンの色変更
            brushColor: function () {
                this.context.strokeStyle = this.brushColor;
            }
        }
    };
</script>

<style scoped>
    .canvas {
        border: 1px solid #000;
    }

    h1 {
        position: relative;
    }

    h1:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 7px;
        background: -webkit-repeating-linear-gradient(-45deg, #FFBA73, #FFBA73 2px, #fff 2px, #fff 4px);
        background: repeating-linear-gradient(-45deg, #FFBA73, #FFBA73 2px, #fff 2px, #fff 4px);
    }
</style>
