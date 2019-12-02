<template>
    <v-container class="grey lighten-5">
        <!-- 一時保管 -->
        <!-- <button @click="plus">+1</button>
            <h1>{{ this.$store.state.count }}</h1> -->

        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <h1>問題を解け</h1>
                <p>問題：{{ this.displayQuestion }}</p>
                <p>回答：{{ this.$store.state.answer }}</p>
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
                    <h2>1.{{ this.displayQuestion }}</h2>
                </div>
            </v-col>
            <v-col></v-col>
        </v-row>

        <br/>

        <v-row>
            <v-col>
                <MyCanvas ref="mycanvas"></MyCanvas>
            </v-col>
            <v-col v-if="this.currentAnswer.length == 2">
                <MyCanvas></MyCanvas>
            </v-col>
            <v-col>
                <div style="margin-bottom:166px"></div>
                <div class="my-2">
                    <!--                    <v-btn depressed color="primary" valign="bottom">取り消し</v-btn>-->
                </div>
            </v-col>

            <v-col>
                <v-row>
                    <v-col>
                        <v-btn
                                color="#FF8100"
                                @click="predictKanji"
                        >
                            保存
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn depressed color="#FF8100" valign="bottom">前の問題</v-btn>
                    </v-col>
                    <v-col>
                        <v-btn
                                v-if="$store.state.userAnswer.length < 3"
                                @click="pushAnswer"
                                depressed
                                color="#FF8100"
                                valign="bottom"
                        >次の問題
                        </v-btn
                        >
                        <v-btn
                                @click="createResult"
                                v-else
                                depressed
                                color="#FF8100"
                                valign="bottom"
                                to="Result"
                        >結果を見る
                        </v-btn
                        >
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="1"></v-col>
            <v-col>
                <v-row
                ><span class="title font-weight-bold">{{ moji[0] }}</span></v-row
                >
                <v-row>
                    <v-col></v-col>
                </v-row>
                <v-row>
                    <div class="display-4">{{ kanji[number] }}</div>
                    <v-col cols="1"></v-col>
                    <v-col
                    >
                        <div class="headline">{{ moji[1] }}{{ kunyomi[number] }}</div>
                        <div class="headline ">{{ moji[2] }}{{ onyomi[number] }}</div>
                        <div class="headline">
                            {{ moji[3] }}{{ kakusu[number] }}
                        </div>
                    </v-col
                    >
                </v-row>
                <v-col></v-col>
                <v-row>
                    <v-col cols="1"></v-col>
                    <div v-if="kanji">
              <span v-for="n in 5">
                <v-btn
                        min-height="100px"
                        min-width="100px"
                        tile
                        outlined
                        color="burakku"
                        @click="choiceKanji(n)"
                ><span class="display-3 font-weight-black">{{
                    kanji[n - 1]
                  }}</span></v-btn
                >
              </span>
                    </div>
                    <!-- <p id = "choice">dvda</p> -->
                </v-row>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
    </v-container>
</template>

<script>
  import MyCanvas from "../components/CanbasL";
  import QuestionSentence from "@/components/QuestionSentence.vue";
  import axios from "axios";
  import {log} from "util";

  export default {
    name: "Question",

    data() {
      return {
        query: "",
        msg: "",
        qInput: ["", "", "", "", "", "", "", "", "", ""],
        qOutput: ["", "", "", "", "", "", "", "", "", ""],
        userAnswer: [],
        tmp: "",
        object: "",
        kanji: "",
        onyomi: "",
        kunyomi: "",
        kakusu: "",
        number: "0",
        moji: ["あなたの書いた字は、", "訓読み :", "音読み :", "画数　 :"],
      };
    },

    components: {
      QuestionSentence,
      MyCanvas
    },

    created() {
      this.getQuestionAndAnswer();
    },

    computed: {
      displayQuestion() {
        return this.$store.state.question[this.$store.state.userAnswer.length];
      },
      currentAnswer() {
        return new String(this.$store.state.answer[this.userAnswer.length]);
      }
    },

    methods: {
      predictKanji() {
        this.$store.commit("pushAnswer");

        const POST_URL = process.env.VUE_APP_URL_BASE + "kanji_search.py";
        let params = new URLSearchParams();
        params.append("object", JSON.stringify(this.$store.state.canvasArray[this.$store.state.canvasArray.length - 1]));
        //ここにURL指定。

        axios
          .post(POST_URL, params)
          .then(response => {
            this.kanji = response.data.kanji;
            this.onyomi = response.data.onyomi;
            this.kunyomi = response.data.kunyomi;
            this.kakusu = response.data.kakusu;
          })
          .catch(err => {
            console.log("err:", err);
          });
      },
      pushAnswer() {
        this.$store.commit("pushAnswer");

        this.$refs.mycanvas.reset();
      },
      choiceKanji(num) {
        this.$store.commit('userChoice', this.kanji[num - 1]);


        this.$store.commit('checkAnswer', {
          userAnswer: this.kanji[num - 1]
        })
      },
      // URLにパラメータとしてgradeが必要
      getQuestionAndAnswer() {
        const POST_URL = process.env.VUE_APP_URL_BASE + "question.py";
        // process.env.VUE_APP_URL_
        let params = new URLSearchParams();
        params.append("grade", this.$route.query.grade);
        //ここにURL指定。

        axios
          .post(POST_URL, params)
          .then(response => {
            console.log(response)
            this.$store.commit('initQuestionAndAnswer', response.data);
          })
          .catch(err => {
            console.log("err:", err);
          });

      },
    }
  };
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
        background: -webkit-repeating-linear-gradient(
                -45deg,
                #ffba73,
                #ffba73 2px,
                #fff 2px,
                #fff 4px
        );
        background: repeating-linear-gradient(
                -45deg,
                #ffba73,
                #ffba73 2px,
                #fff 2px,
                #fff 4px
        );
    }
</style>
