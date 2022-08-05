import VueRouter from 'vue-router'
import Main from "@/pages/Main";

export default new VueRouter({
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

            ]
        }
    ]
})