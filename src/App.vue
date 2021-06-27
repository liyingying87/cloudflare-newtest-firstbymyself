<template>
<div>
<!--  <index></index>-->
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/user/foo">Go to Foo</router-link>
    <router-link to="/user/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
  {{ msg }}
  2、写一个按钮触发函数调起接口
  <a href="javascript:" v-on:click="get()">GET按钮</a>
</div>
</template>

<script>

// import index from './components/index.vue'
export default {
  name: 'App',
  mounted(){

  },
  components: {

  },
  data(){
    return{
      title: '我去！！！',
      msg:'',
      apiurl: 'http://api/baidu.com/storage/?room=1'
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
      })
    }
  }
}
</script>

<style>

</style>
