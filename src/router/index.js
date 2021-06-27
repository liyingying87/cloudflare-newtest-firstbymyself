import Vue from 'vue'
import Router from 'vue-router'
import bottom from "@/components/bottom";
// import content from "@/components/content";
// import bottom from "@/components/bottom";

Vue.use(Router)

export default new Router ({
    routes:[
    //     {
    //     path: '/foo',
    //     component: content
    // },
    //     {
    //         path:'/bar',
    //         component:bottom
    //     }
        // 动态路径参数 以冒号开头  像 /user/foo 和 /user/bar 都将映射到相同的路由。
        { path: '/user/:username', component: bottom }
    ]
})