import Cookie from 'js-cookie'
export default {
    namespaced: true,
    state: {
        token: ''
    },
    mutations: {
        setCookie (state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        clearCookie (state) {
            state.token = ''
            Cookie.remove('token')
        },
        getCookie (state) {
            // 前人的智慧确实无可匹敌，该函数的意义就是，刷新页面后store的数据会清空，从而读取本地Cookie的内容
            state.token = state.token || Cookie.get('token')
        }
    }
}