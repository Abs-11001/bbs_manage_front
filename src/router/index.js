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

router.beforeEach((to, from, next) => {
    store.commit('loginAbout/getCookie')

    if (store.state.asideAbout.menu.length === 0) {
        // 防止route重复添加
        store.commit('asideAbout/addRouter', router)
    }

    const token = store.state.loginAbout.token

    if (!token && to.name !== 'login') {
        next({name: 'login'})
    } else if (token && to.name === 'login') {
        next({name: 'home'})
    }else {
        next()
    }
})

export default router
