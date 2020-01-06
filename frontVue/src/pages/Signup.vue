<template>

    <v-form
            ref="form"
            v-model="valid"
            lazy-validation
    >
        <v-text-field
                v-model="name"
                :counter="10"
                :rules="nameRules"
                label="ニックネーム"
                hint="10文字以内で入力してください。"
                required
        ></v-text-field>

        <v-text-field
                v-model="email"
                :rules="emailRules"
                label="メールアドレス"
                hint="有効なメールアドレスを入力してください。"
                required
        ></v-text-field>


        <!--パスワード入力１回目-->
        <v-text-field
                prepend-icon=""
                label="パスワード"
                type="password"
                v-model="password"
                :rules="passwordRules"
                hint="6文字以上で入力してください。"
                required
        ></v-text-field>

        <!--パスワード入力2回目-->

        <!--<v-text-field-->
        <!--prepend-icon=""-->
        <!--label="パスワード2"-->
        <!--type="password2"-->
        <!--v-model="passwordConfirm"-->
        <!--:rules="passwordConfirmRules"-->
        <!--hint="6文字以上で入力してください。"-->
        <!--required-->
        <!--&gt;</v-text-field>-->


        <!--<v-checkbox-->
        <!--v-model="checkbox"-->
        <!--:rules="[v => !!v || 'You must agree to continue!']"-->
        <!--label="Do you agree?"-->
        <!--required-->
        <!--&gt;</v-checkbox>-->

        <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
        >
            完了
        </v-btn>

        <v-btn
                color="error"
                class="mr-4"
                @click="reset"
        >
            一括リセット
        </v-btn>

    </v-form>

</template>

<script>
  export default {
    name: "Signup",

    data: () => ({
      valid: true,


      name: '',

      nameRules: [
        v => !!v || '10文字以内で入力してください。',
        v => (v && v.length <= 10) || '10文字を超えています。',
      ],

      email: '',
      emailRules: [
        v => !!v || '有効なメールアドレスを入力してください。',
        v => /.+@.+\..+/.test(v) || '有効なメールアドレスを入力してください。',
      ],


      password: '',
      passwordRules: [
        v => !!v || '6文字以上で入力してください',

        v => (v && v.length >= 6) || '6文字以上で入力してください。',
      ],

      // passwordConfirm: '',
      // passwordConfirmRules: [
      //     v => !!v || '6文字以上で入力してください',
      //
      // //
      //     v => (v === this.passwordRules) || 'Password confirm is equal to password',
      // ],
    }),


    methods: {
      validate() {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset() {
        this.$refs.form.reset()
      },


    },
  }
</script>

<style scoped>

</style>