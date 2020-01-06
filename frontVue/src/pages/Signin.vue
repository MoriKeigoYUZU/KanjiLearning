<template>
    <!--<div class="text-center">-->
    <!--<v-btn color="error" @click="overlay = !overlay">-->
    <!--Show Overlay-->
    <!--</v-btn>-->

    <!--<v-overlay :value="overlay">-->
    <!--<v-btn icon @click="overlay = false">-->
    <!--<v-icon>mdi-close</v-icon>-->
    <!--</v-btn>-->
    <!--</v-overlay>-->
    <!--</div>-->

    <!--<SinginPage></SinginPage>-->

</template>


<script>

  // import SinginPage from '../components/SinginPage'

  export default {
    name: "Signin",
    // components: {SinginPage},


    methods: {
      data: () => ({
        overlay: false,
      }),
    }
  }
</script>

<style scoped>

</style>