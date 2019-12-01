<template>

    <!--<link rel="stylesheet" href="style.style.css">-->

    <v-container class="grey lighten-5">
        <h1>日本漢字能力検定</h1>
        <br>
        <p>漢字ラーニングは漢字検定の模擬問題を出題しているサイトです。<br>
            「書き取り」の問題を解くことができます。</p>


        <h3>問題に挑戦✎</h3>
        <v-row no-gutters>
                <v-card class="pa-2" outlined tile>
                    <v-card
                            class="mx-auto"
                            max-width="395"
                    >
                        <v-img
                                class="white--text align-end"
                                height="200px"
                                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                        >
                            <v-card-title>日本漢字能力検定10級</v-card-title>
                        </v-img>

                        <v-card-subtitle class="pb-0">Kanji test level 10</v-card-subtitle>

                        <v-card-text class="text--primary">
                            <div class = "headline font-weight-black text-center"><span style="color:red;">オオ</span>きないえにすんでいる。</div>
                        </v-card-text>

                        <v-card-actions>
<!--                            <router-link href="/Question">-->
                            <v-btn style="color:orange;" text href="/Question?grade=10">
                                レッスン開始
                            </v-btn>
<!--                            </router-link>-->
                        </v-card-actions>
                    </v-card>
                </v-card>

            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定9級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 9</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">家に先生が<span style="color:red;">ク</span>る。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=9"
                        >
                            レッスン開始
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-card>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        <v-card-title>日本漢字能力検定8級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 8</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">お<span style="color:red;">レイ</span>の手紙を書く。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=8"
                        >
                            レッスン開始
                        </v-btn>


                    </v-card-actions>
                </v-card>
            </v-card>
        </v-row>
        <!--  -->
        <v-row no-gutters>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定7級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 7</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center"><span style="color:red;">ゼンゼン</span>面白くない。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=7"
                        >
                            レッスン開始
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>

            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        <v-card-title>日本漢字能力検定6級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 6</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">土地の<span style="color:red;">カチ</span>を調べる。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=6"
                        >
                            レッスン開始
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-card>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定5級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 5</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center"><span style="color:red;">ナイカク</span>の支持率が発表された。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=5"
                        >
                            レッスン開始
                        </v-btn>


                    </v-card-actions>
                </v-card>
            </v-card>
        </v-row>
        <v-row no-gutters>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定4級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 4</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">貴重な<span style="color:red;">タイケン</span>をした。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=4"
                        >
                            レッスン開始
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>

            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        <v-card-title>日本漢字能力検定3級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 3</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">株式会社を<span style="color:red;">セツリツ</span>する。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=3"
                        >
                            レッスン開始
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-card>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定準2級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level Quasi 2</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">注意事項を<span style="color:red;">キサイ</span>する。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=2．5"
                        >
                            レッスン開始
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>
        </v-row>
        <v-row no-gutters>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定2級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 2</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center">日本全国を<span style="color:red;">モウラ</span>する。</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                                href="/Question?grade=2"
                        >
                            レッスン開始
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-card>

            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        <v-card-title>日本漢字能力検定準1級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level Quasi 1</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center"><span style="color:red;">Coming Soon!!</span></div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                        >

                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-card>
            <v-card class="pa-2" outlined tile>
                <v-card
                        class="mx-auto"
                        max-width="395"
                >
                    <v-img
                            class="white--text align-end"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                    >
                        <v-card-title>日本漢字能力検定1級</v-card-title>
                    </v-img>

                    <v-card-subtitle class="pb-0">Kanji test level 1</v-card-subtitle>

                    <v-card-text class="text--primary">
                        <div class = "headline font-weight-black text-center"><span style="color:red;">Coming Soon!!</span></div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                color="orange"
                                text
                        >
                            
                        </v-btn>


                    </v-card-actions>
                </v-card>
            </v-card>
        </v-row>
        <v-col>
            <v-btn outline large color="purple" dark to="Top">
                トップページに戻る
            </v-btn>
        </v-col>
    </v-container>


</template>

<script>
    export default {
        name: "QuestionTop"
    }
</script>

<style scoped>
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

    h3 {
        position: relative;
        padding: 0.25em 0;
    }
    h3:after {
        content: "";
        display: block;
        height: 4px;
        background: -webkit-linear-gradient(to right, rgb(255, 186, 115), #ffb2b2);
        background: linear-gradient(to right, rgb(255, 186, 115), #ffb2b2);
    }
    a {  text-decoration: none;}
</style>