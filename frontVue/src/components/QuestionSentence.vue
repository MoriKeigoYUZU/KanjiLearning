<template>
    <div id="Question">
        <p> {{Question[0]}} </p>

        <p> {{Question[1]}} </p>

        <p> {{Question[2]}} </p>

    </div>

</template>

<script>
  export default {
    name: "Question",

    el: '#Question',

    data() {
      return {
        Question: ['ここに問題を入力', 'に', 'さん'],
      }
    },


    methods: {}

  }
</script>

<style scoped>

</style>