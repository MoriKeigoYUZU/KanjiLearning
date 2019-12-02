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
        <p>回答：{{ answer }}</p>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <v-row><v-col></v-col></v-row>

    <v-row>
      <v-col cols="1"></v-col>
      <v-col>
        <div>
          <h2>1.{{ this.displayQuestion }}</h2>
        </div>
      </v-col>
      <v-col></v-col>
    </v-row>

    <br />

    <v-row>
      <v-col>
        <MyCanvas></MyCanvas>
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
            <v-btn depressed color="#FF8100" valign="bottom">前の問題</v-btn>
          </v-col>
          <v-col>
            <v-btn
              v-if="$store.state.userAnswer.length < 10"
              @click="pushAnswer"
              depressed
              color="#FF8100"
              valign="bottom"
              >次の問題</v-btn
            >
            <v-btn
              v-else
              @click="predict10Question"
              depressed
              color="#FF8100"
              valign="bottom"
              >結果を見る</v-btn
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col></v-col>
    </v-row>
  </v-container>
</template>

<script>
import MyCanvas from "../components/CanbasL";
import QuestionSentence from "@/components/QuestionSentence.vue";
import axios from "axios";
import { log } from "util";

export default {
  name: "Question",

  data() {
    return {
      query: "",
      msg: "",
      question: "",
      answer: "",
      qInput: ["", "", "", "", "", "", "", "", "", ""],
      qOutput: ["", "", "", "", "", "", "", "", "", ""],
      userAnswer: []
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
      return this.question[this.$store.state.userAnswer.length];
    },
    currentAnswer() {
      return new String(this.answer[this.userAnswer.length]);
    }
  },

  methods: {
    // async getResult() {
    //   const POST_URL = process.env.VUE_APP_URL_BASE + "predict.py";
    //   console.log(POST_URL);
    //   let params = new URLSearchParams();
    //   params = JSON.stringify({
    //     q1: JSON.stringify([this.$store.state.userAnswer[0]]),
    //     q2: JSON.stringify([this.$store.state.userAnswer[1]]),
    //     q3: JSON.stringify([this.$store.state.userAnswer[2]]),
    //     q4: JSON.stringify([this.$store.state.userAnswer[3]]),
    //     q5: JSON.stringify([this.$store.state.userAnswer[4]]),
    //     q6: JSON.stringify([this.$store.state.userAnswer[5]]),
    //     q7: JSON.stringify([this.$store.state.userAnswer[6]]),
    //     q8: JSON.stringify([this.$store.state.userAnswer[7]]),
    //     q9: JSON.stringify([this.$store.state.userAnswer[8]]),
    //     q10: JSON.stringify([this.$store.state.userAnswer[9]])
    //   });
    //   console.log(params);
    //   //ここにURL指定。

    //   await axios
    //     .post(POST_URL, params)
    //     .then(response => {
    //       console.log("-----");
    //       console.log(response.data);
    //       console.log("-----");
    //     })
    //     .catch(err => {
    //       console.log("err:", err);
    //     });
    // },
    pushAnswer() {
      this.$store.commit("pushAnswer");
    },
    // URLにパラメータとしてgradeが必要
    getQuestionAndAnswer() {
      // const POST_URL = "http://kanjilearnig.tk/cgi-bin/question.py";
      const POST_URL = process.env.VUE_APP_URL_BASE + "question.py";
      // process.env.VUE_APP_URL_
      let params = new URLSearchParams();
      params.append("grade", this.$route.query.grade);
      //ここにURL指定。

      axios
        .post(POST_URL, params)
        .then(response => {
          this.question = response.data.question;
          this.answer = response.data.answer;
        })
        .catch(err => {
          console.log("err:", err);
        });
    },

    async predict10Question() {
      const POST_URL = process.env.VUE_APP_URL_BASE + "predict.py";
      let params = new URLSearchParams();
      for (let i = 0; i < 10; i++) {
        params.append("q" + (i + 1), JSON.stringify(this.$store.state.userAnswer[i]));
      }
      //ここにURL指定。

      await axios
        .post(POST_URL, params)
        .then(response => {
          for (let i = 0; i < 10; i++) {
              console.log(response.data)
            this.qOutput[i] = response.data["q" + (i+1)];
            console.log(this.qOutput)
          }
        })
        .catch(err => {
          console.log("err:", err);
        });
    },

    plus() {
      this.$store.commit("increment");
    }
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
