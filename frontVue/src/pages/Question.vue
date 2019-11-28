<template>

    <v-container class="grey lighten-5">

        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <h1>問題を解け</h1>
                {{msg}}
            </v-col>
            <v-col cols="1"></v-col>
        </v-row>

        <v-row>
            <v-col></v-col>
        </v-row>

        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <div>
                    <h2>1.{{ query }}</h2>
                </div>
            </v-col>
            <v-col></v-col>
        </v-row>

        <br>

        <v-row>
            <v-col></v-col>
            <v-col>
                <MyCanvas></MyCanvas>
            </v-col>
            <v-col>
                <div style="margin-bottom:166px"></div>
                <div class="my-2">
                    <!--                    <v-btn depressed color="primary" valign="bottom">取り消し</v-btn>-->
                </div>

            </v-col>


            <v-col>
                <br><br><br><br><br><br><br><br><br><br><br><br><br>

                <v-low>
                    <v-btn depressed color="#FF8100" valign="bottom">前の問題</v-btn>
                    <span>&nbsp;</span>
                    <v-btn depressed color="#FF8100" valign="bottom" to="Result">次の問題</v-btn>
                </v-low>
            </v-col>
            <v-col></v-col>
        </v-row>

    </v-container>

</template>

<script>

    import MyCanvas from '../components/CanbasL'
    import QuestionSentence from '@/components/QuestionSentence.vue'
    import axios from 'axios';

    export default {
        name: "Question",

        data() {
            return {
                query: "",
                msg: ""
            };
        },

        components: {
            QuestionSentence,
            MyCanvas
        },

        methods: {
            get_question: function () {


                // const POST_URL = "http://kanjilearnig.tk/cgi-bin/question.py";
                const POST_URL = "http://221.118.70.206:8000/cgi-bin/question.py";
                // process.env.VUE_APP_URL_
                let params = new URLSearchParams();
                params.append("grade", 5);
                //ここにURL指定。

                axios.post(POST_URL, params)
                    .then(response => {
                        this.msg = response.data;
                    }).catch(err => {
                    console.log('err:', err);
                    this.msg = err;
                });
            },
        },

        created() {
            // const GET_URL = "http://localhost:8888/dataBase/get.php";
            //
            // axios.get(GET_URL)
            //     .then(response => {
            //         this.query = response.data.kanji[0];
            //     }).catch(err => {
            //     console.log('err:', err);
            // });

            this.get_question();
        }
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

</style>