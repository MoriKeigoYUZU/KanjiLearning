<template>

    <v-app>
        <v-app-bar app color="#FF8E00" dark>
            <v-app-bar-nav-icon>
                <v-menu
                        left
                        bottom
                >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item to="Top">
                            <v-list-item-title>Topページ</v-list-item-title>
                        </v-list-item>
                        <v-list-item href="KanjiLearning">
                            <v-list-item-title>漢字練習</v-list-item-title>
                        </v-list-item>
                        <v-list-item to="QuestionTop">
                            <v-list-item-title>漢検練習</v-list-item-title>
                        </v-list-item>

                    </v-list>
                </v-menu>
            </v-app-bar-nav-icon>

            <v-toolbar-title class="headline font-weight-black">
                    KanjiLearning
            </v-toolbar-title>

            <div class="flex-grow-1"></div>


        </v-app-bar>

        <v-content>

            <p>

                <!--      &lt;!&ndash; ナビゲーションに router-link コンポーネントを使う &ndash;&gt;-->
                <!--      &lt;!&ndash; リンク先を `to` プロパティに指定します &ndash;&gt;-->
                <!--      &lt;!&ndash; デフォルトで `<router-link>` は `<a>` タグとして描画されます &ndash;&gt;-->
                <!--<router-link to="/">haro</router-link>/-->
                <!--<router-link to="/Top">Top</router-link>/-->
                <!--<router-link to="/KanjiLearning"> KANJI</router-link>/-->
                <!--&lt;!&ndash;        <router-link to="/Signin"> Signin</router-link>/&ndash;&gt;-->
                <!--&lt;!&ndash;        <router-link to="/Signup"> Signup</router-link>/&ndash;&gt;-->
                <!--<router-link to="/Question"> Question</router-link>/-->
                <!--<router-link to="/QuestionTop"> QuestionTop</router-link>/-->
                <!--<router-link to="/Result">Result</router-link>-->

            </p>

            <v-container fluid>

                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer>
            <v-spacer></v-spacer>
            <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-footer>
    </v-app>

</template>

<script>


  export default {
    name: 'App',
    components: {},
    data: () => ({}),
  };
</script>


