import Cookie from 'js-cookie'
export default {
    namespaced: true,
    state: {
        token: '',
        uuid: '',
        user_name: '',
        nick_name: '',
        avatar: '',
        expire_time: ''
    },
    mutations: {
        setCookie (state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        setUuid(state, val) {
            state.uuid = val
            Cookie.set('uuid', val)
        },
        setUserName(state, val) {
            state.user_name = val
            Cookie.set('user_name', val)
        },
        setNickName(state, val) {
            state.nick_name = val
            Cookie.set('nick_name', val)
        },
        setAvatar(state, val) {
            state.avatar = val
            Cookie.set('avatar', val)
        },
        setExpireTime(state, val) {
            state.expire_time = val
            Cookie.set('expire_time', val)
        },
        clearCookie (state) {
            state.token = ''
            state.uuid = ''
            state.user_name = ''
            state.nick_name = ''
            state.avatar = ''
            state.expire_time = ''
            Cookie.remove('token')
            Cookie.remove('uuid')
            Cookie.remove('user_name')
            Cookie.remove('nick_name')
            Cookie.remove('avatar')
            Cookie.remove('expire_time')
        },
        getCookie (state) {
            state.token = state.token || Cookie.get('token')
            state.uuid = state.uuid || Cookie.get('uuid')
            state.user_name = state.user_name || Cookie.get('user_name')
            state.nick_name = state.nick_name || Cookie.get('nick_name')
            state.avatar = state.avatar || Cookie.get('avatar')
            state.expire_time = state.expire_time || Cookie.get('expire_time')
        }
    }
}
