import VueRouter from 'vue-router'
import Main from "@/pages/Main";
import Vue from 'vue'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
            redirect: 'home',
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: () => import("@/pages/home/index.vue")
                },
                {
                    path: 'user',
                    name: 'user',
                    component: () => import("@/pages/user/index.vue")
                },
                {
                    path: 'announcement',
                    name: 'announcement',
                    component: () => import("@/pages/announcement/index.vue"),
                    children: [
                        {
                            path: 'plateManagement',
                            name: 'plateManagement',
                            component: () => import("@/pages/announcement/plateManagement/index.vue")
                        },
                        {
                            path: 'announcementManagement',
                            name: 'announcementManagement',
                            component: () => import("@/pages/announcement/announcementManagement/index.vue")
                        },
                    ]
                },
                {
                    path: 'article',
                    name: 'article',
                    component: () => import("@/pages/article/index.vue"),
                    children: [
                        {
                            path: 'informationShare',
                            name: 'informationShare',
                            component: () => import("@/pages/article/informationShare/index.vue")
                        },
                        {
                            path: 'helpEachOther',
                            name: 'helpEachOther',
                            component: () => import("@/pages/article/helpEachOther/index.vue")
                        },
                        {
                            path: 'treeHole',
                            name: 'treeHole',
                            component: () => import("@/pages/article/treeHole/index.vue")
                        },
                    ]
                },
                {
                    name: 'carousel',
                    path: 'carousel',
                    component: () => import("@/pages/carousel/index.vue"),
                    children: [
                        {
                            name: 'imgCarousel',
                            path: 'imgCarousel',
                            component: () => import("@/pages/carousel/imgCarousel/index.vue")
                        },
                        {
                            name: 'textCarousel',
                            path: 'textCarousel',
                            component: () => import("@/pages/carousel/textCarousel/index.vue")
                        }
                    ]
                }
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('../pages/login')
        }
    ]
})

// 防止控制台报错，虽然并无影响，但是看着难受
// 主要现象为：点击当前路由时，会提示重复
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

// router.beforeEach((to, from, next) => {
//     console.log(to)
//     store.commit('loginAbout/getCookie')
//
//     // 无语了，原来可以在vue事例创建的时候把动态路由创建好,以后就不用操心路由的事情了
//
//     // console.log(to, from)
//     // if (store.state.asideAbout.menu.length === 0) {
//     //     // 防止route重复添加
//     //     store.commit('asideAbout/addRouter', router)
//     // }
//     const token = store.state.loginAbout.token
//     /// 除了判断token是否存在以外， 还需要判断当前的界面是不是login，不然哪怕login界面也会一直检测token存不存在，直接内存爆炸
//     // if (!token && to.name !== 'login') {
//     //     next({name: 'login'})
//     // } else if (token && to.name === 'login') {
//     //     next({name: 'home'})
//     // }else if (token && to.name !== 'login'){
//     //     // 刷新的复杂机制，第一次不会丢失route中的name，第二次丢失route中的name，所以需要判断route中是否存在name，如果没有就用path进行跳转
//     //     if (to.name) {
//     //         next()
//     //         // console.log('name存在',  to.name)
//     //     }else{
//     //         next({path: to.path})
//     //         // console.log('name不存在',  to.name)
//     //     }
//     // }else {
//     //     next()
//     // }
//
//     // if (!token && to.name !== 'login') {
//     //     next({name: 'login'})
//     // } else if (token && to.name === 'login') {
//     //     next({name: 'home'})
//     // }else {
//     //     next()
//     // }
// })

export default router
