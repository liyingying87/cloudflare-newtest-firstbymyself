<template>
<div>
<!--&lt;!&ndash;  <index></index>&ndash;&gt;-->
<!--  <p>-->
<!--    &lt;!&ndash; 使用 router-link 组件来导航. &ndash;&gt;-->
<!--    &lt;!&ndash; 通过传入 `to` 属性指定链接. &ndash;&gt;-->
<!--    &lt;!&ndash; <router-link> 默认会被渲染成一个 `<a>` 标签 &ndash;&gt;-->
<!--    <router-link to="/user/foo">Go to Foo</router-link>-->
<!--    <router-link to="/user/bar">Go to Bar</router-link>-->
<!--  </p>-->
<!--  &lt;!&ndash; 路由出口 &ndash;&gt;-->
<!--  &lt;!&ndash; 路由匹配到的组件将渲染在这里 &ndash;&gt;-->
<!--  <router-view></router-view>-->
<!--  {{ msg }}-->
<!--  2、写一个按钮触发函数调起接口-->
<!--  <a href="javascript:" v-on:click="get()">GET按钮</a>-->
<!--  <a href="javascript:" v-on:click="post()">POST按钮</a>-->
  <Test_MapTrack></Test_MapTrack>
</div>
</template>

<script>
import Test_MapTrack from "@/components/Test_MapTrack";

const circle = require('./circle.js');
// import index from './components/index.vue'
export default {
  name: 'App',
  mounted(){

  },
  components: {
    Test_MapTrack,
  },
  data(){
    return{
      msg:'不',
    }
  },
  // created() {
  //   // this.$axios.get("/user?ID=12345")
  //   //     .then(function(res){//成功執行的函數
  //   //       console.log(res)
  //   //     })
  //   //     .catch(function(err){//失敗執行的函數
  //   //       console.log(err);
  //   //     })
  // }
  methods: {

    get: function() {
      // this.axios.get('/mock/login.json').then(res=>{
      //   console.log(res.data)
      // })
      this.axios.get('/user/login').then(res=>{
        console.log(res.data)
        console.log(`The area of a circle of radius 4 is ${circle.area(4)}`);
      })
    },
    post:function (){

      this.axios.post('/user/login',{
        status:1,
        data:{
          id:3
        },
        msg:"失败"
      }).then(res=>{
        console.log(res.data)
      }).catch(error=>{
        console.log(error.data)
      })
    }
  }
}
</script>

<style>

</style>
