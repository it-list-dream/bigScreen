import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    component: () => import('../views/Login.vue')
}, {
    path: '/layout',
    component: () => import('../views/Layout.vue'),
    meta: {
        requireAuth: true
    }
}]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (localStorage.getItem('username')) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            //console.log('没有登录')
            next({
                path: '/',
            })
        }
    } else {
        next()
    }
})
export default router