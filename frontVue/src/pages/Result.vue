<template>
    <v-container class="grey lighten-5">
        <h1>結果</h1>
        <br>
        <p>なにか書きたいことがあれば<br>ここに</p>

        <v-simple-table fixed-header height="380px">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">番号</th>
                    <th class="text-left">問題</th>
                    <th class="text-left">あなたの回答</th>
                    <th class="text-left">正誤</th>
                    <th class="text-left">正しい答え</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in $store.state.result" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{ $store.state.question[index] }}</td>
                    <td>{{ item.userAnswer }}</td>
                    <td>{{ item.userAnswer == $store.state.answer[index] }}</td>
                    <td>{{ $store.state.answer[index] }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>

        <br>

        <v-row>
            <v-col></v-col>

            <v-col class="text-center" cols="12" sm="4">

                <div class="my-2" align="right">
                    <v-btn outline large color="purple" dark to="Top">
                        トップページに戻る
                    </v-btn>
                    <span>&nbsp;</span>
                    <v-btn depressed large color="#527AFF">やり直す</v-btn>
                    <span>&nbsp;</span>
                    <router-link to="/QuestionTop">
                        <v-btn depressed large color="#FF7B4E">終了</v-btn>
                    </router-link>

                </div>
            </v-col>
        </v-row>


    </v-container>


</template>

<script>
  export default {
    name: "Result",

    data() {
      return {
        desserts: [
          {
            number: 1,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 2,
            question: '林の’たけ’をきる。',
            answer: '竹',
            correction: '✕',
          },
          {
            number: 3,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 4,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 5,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 6,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 7,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 8,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 9,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },
          {
            number: 10,
            question: '’おお’きないえにすんでいる。',
            answer: '大',
            correction: '○',
          },


        ],
      }
    },

    methods: {}
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

    a {
        text-decoration: none;
    }
</style>