<template>
<div>
  <h1>dibudaohang</h1>
  <div>User {{ $route.params }}</div>
</div>
</template>

<script>
export default {
  name: "bottom",
//复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) $route 对象：
  // watch: {
  //   $route(to, from) {
  //     // 对路由变化作出响应...
  //   }
  // }
  //或者使用 2.2 中引入的 beforeRouteUpdate 导航守卫：
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  // }
}
</script>

<style scoped>

</style>