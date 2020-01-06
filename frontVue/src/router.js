

import Vue from 'vue';
import Router from 'vue-router';

//ページが追加されるたびに追加
import HelloWorld from './components/HelloWorld.vue';
// import KanjiLearning from './components/KanjiLearning';
import KanjiLearning from './pages/KanjiLearning';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Question from './pages/Question';
import QuestionTop from './pages/QuestionTop';
import Result from './pages/Result';
import Top from './pages/Top';


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/Top',
            name: 'Top',
            component: Top
        },
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/KanjiLearning',
            name: 'KanjiLearning',
            component: KanjiLearning
        },
        {
            path: '/Signin',
            name: 'Signin',
            component: Signin
        },
        {
            path: '/Signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/Question',
            name: 'Question',
            component: Question
        },
        {
            path: '/QuestionTop',
            name: 'QuestionTop',
            component: QuestionTop
        },
        {
            path: '/Result',
            name: 'Result',
            component: Result
        }
    ]
})

