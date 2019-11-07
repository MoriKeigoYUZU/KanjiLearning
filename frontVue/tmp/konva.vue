<template>
    <v-app>
        <div ref="container">
            <canvas :width="width / 2" :height="height / 2" ref="canvas"></canvas>
        </div>
        <v-btn color="primary" @click="saveLocal">一時保存</v-btn>
    </v-app>
</template>

<script>
    export default {
        import Konva from "konva";

    data: () => ({
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
    }),
        mounted: function() {
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
        mousedown: function() {
            this.isPaint = true;

            // マウスダウン時の座標を取得しておく
            this.lastPointerPosition = this.stage.getPointerPosition();
        },
        mouseup: function() {
            this.isPaint = false;
        },
        mousemove: function() {
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
        onClearCanvas: function() {
            this.context.globalCompositeOperation = "destination-out";
            this.context.fillRect(0, 0, this.width, this.height);
            this.drawingLayer.draw();

            this.$emit("on-reset");
        },
        // 現在のモードが指定されたモードと一致するかどうか
        isTargetMode: function(targetMode) {
            return this.mode === targetMode;
        }
    },
    watch: {
        // ペンの色変更
        brushColor: function() {
            this.context.strokeStyle = this.brushColor;
        }
    }
    };
</script>

<style scoped>
    .canvas {
        border: 1px solid #000;
    }
</style>