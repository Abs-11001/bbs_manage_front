import VueRouter from 'vue-router'
import Main from "@/pages/Main";
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            name: 'main',
            path: '/',
            component: Main,
            redirect: '/home',
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import('../pages/home')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: () => import('../pages/user')
                },
                {
                    path: 'mall',
                    name: 'mall',
                    component: () => import('../pages/mall')
                },
                {
                    path: 'page1',
                    name: 'page1',
                    component: () => import('../pages/other/otherOne')
                },
                {
                    path: 'page2',
                    name: 'page2',
                    component: () => import('../pages/other/otherTwo')
                },
            ]
        }
    ]
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router