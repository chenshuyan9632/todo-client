import Vue from "vue";
import Router from 'vue-router';
import Login from '@/page/Login'
import Todo from '@/page/Todo'


Vue.use(Router);

const router = new Router({
  routes:[
    {
      path:"/",
      component:Login,
    },
    {
      path:"/todo",
      component:Todo,
    }
  ]
});

export default router;