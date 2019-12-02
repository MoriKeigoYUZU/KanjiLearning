import Vuex from 'vuex';
import Vue from 'vue';
import Persistancer from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    // plugins: [Persistancer()],
    state: {
      count: 0,
      userAnswer: []
    },
    mutations: {
      increment (state) {
        state.count++
      },
      pushAnswer(state) {
        const nowContexts = document.getElementsByClassName("canvas");
        // console.log(nowContext)
        const nowContextData1 = nowContexts[0].getContext("2d");
  
        let imageData1 = nowContextData1.getImageData(0, 0, 320, 320);
  
        let data = imageData1.data;
        let tmp = [];
  
        for (var i = 0; i < data.length; i += 4) {
          let p = data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 ? 0 : 255;
          tmp.push(p);
        }
  
        let object = [];
        let formated = [];
        for (var i = 0; i < tmp.length; i++) {
          // if (i != 0 && i % 64 == 0) {
          if (i != 0 && i % 320 == 0) {
            formated.push(object);
            object = [];
          }
          object.push(tmp[i]);
        }
        formated.push(object);
  
        //これを送る
        console.log(formated);
  
        console.log("fds");
        var tbl = new Array(64);
        for (let y = 0; y < 64; y++) {
          tbl[y] = new Array(64).fill(255);
        }
  
        var judgment = 0;
        for (let i = 0; i < 64; i++) {
          for (let j = 0; j < 64; j++) {
            for (let mi = (i + 1) * 5 - 5; mi < (i + 1) * 5; mi++) {
              for (let mj = (j + 1) * 5 - 5; mj < (j + 1) * 5; mj++) {
                if (formated[mi][mj] === 0) {
                  tbl[i][j] = 0;
                }
              }
            }
          }
        }
  
        const answer1 = tbl;
        tbl = [];
  
        if (nowContexts[1]) {
          const nowContextData2 = nowContexts[1].getContext("2d");
          let imageData2 = nowContextData2.getImageData(0, 0, 320, 320);
  
          let data = imageData2.data;
          let tmp = [];
  
          for (var i = 0; i < data.length; i += 4) {
            let p =
              data[i] == 0 && data[i + 1] == 0 && data[i + 2] == 0 ? 0 : 255;
            tmp.push(p);
          }
  
          let object = [];
          let formated = [];
          for (var i = 0; i < tmp.length; i++) {
            // if (i != 0 && i % 64 == 0) {
            if (i != 0 && i % 320 == 0) {
              formated.push(object);
              object = [];
            }
            object.push(tmp[i]);
          }
          formated.push(object);
  
          //これを送る
          console.log(formated);
  
          console.log("fds");
          var tbl = new Array(64);
          for (let y = 0; y < 64; y++) {
            tbl[y] = new Array(64).fill(255);
          }
  
          var judgment = 0;
          for (let i = 0; i < 64; i++) {
            for (let j = 0; j < 64; j++) {
              for (let mi = (i + 1) * 5 - 5; mi < (i + 1) * 5; mi++) {
                for (let mj = (j + 1) * 5 - 5; mj < (j + 1) * 5; mj++) {
                  if (formated[mi][mj] === 0) {
                    tbl[i][j] = 0;
                  }
                }
              }
            }
          }
  
          const answer2 = tbl;
          const answers = answer1.concat(answer2);
          state.userAnswer.push(answers);
          return;
        }
  
        state.userAnswer.push(answer1);
      }
    }
  })