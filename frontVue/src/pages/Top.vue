<template>
    <v-container class="grey lighten-5">

    <v-row>
        <v-col>

            <img src="../../public/rogo.png" height="165" width="646"/>

            <v-row>
                <v-col cols="3"></v-col>
            <h2 align="right"><br>自分の手書き文字がAIによって認識できます。</h2>
            </v-row>


            <br><br>
            <v-row>
                <v-col cols="1"></v-col>
                <v-col>
                    <v-card
                            max-width="344"
                            class="mx-auto"

                    >

                    <v-list-item>
                        <v-list-item-avatar color="green"></v-list-item-avatar>
                        <v-list-item-content>
<!--                            <v-list-item-title class="headline">漢字ラーニング</v-list-item-title>-->
                            <h2>漢字ラーニング</h2>
<!--                            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>-->
                        </v-list-item-content>
                    </v-list-item>
                        <p>画像いれる予定</p>

<!--                    <v-img-->
<!--                            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"-->
<!--                            height="194"-->
<!--                    ></v-img>-->

                    <v-card-text>
                        手書きで文字を入力し、漢字を特定します。
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                                text
                                color="deep-purple accent-4"
                                onclick="KanjiLearning.vue"


                        >
                            TRY
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
                </v-col>
                <v-col>
                    <v-card
                            max-width="344"
                            class="mx-auto"

                    >

                        <v-list-item>
                            <v-list-item-avatar color="purple"></v-list-item-avatar>
                            <v-list-item-content>
                                <!--                            <v-list-item-title class="headline">漢字ラーニング</v-list-item-title>-->
                                <h2>漢検練習</h2>
                                <!--                            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>-->
                            </v-list-item-content>
                        </v-list-item>
                        <p>画像いれる予定</p>

                        <!--                    <v-img-->
                        <!--                            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"-->
                        <!--                            height="194"-->
                        <!--                    ></v-img>-->

                        <v-card-text>
                            実際に文字を自分で書いて漢検の勉強をすることができます。
                        </v-card-text>

                        <v-card-actions>
                            <v-btn
                                    text
                                    color="deep-purple accent-4"
                            >
                                 TRY
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
<!--                <v-col cols="3"></v-col>-->
            </v-row>


        </v-col>
        <v-col cols="1"></v-col>
        <v-col><img src="../../public/natu.png" height="582" width="447"/></v-col>

    </v-row>
<!--        <v-row>-->
<!--            <h2 align="right"><br>自分の手書き文字がAIによって認識できます。</h2>-->
<!--        </v-row>-->
    </v-container>
</template>

<script>
    export default {
        name: "top"
    }
</script>

<style scoped>

</style>