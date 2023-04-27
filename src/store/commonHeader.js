export default {
    namespaced: true,
    state: {
      breadcrumb: [
          {
              path: '/home',
              name: '首页'
          }
      ]
    },
    mutations: {
        addBreadCrumb (state, value) {
            console.log('breadcrumb', value)
            for (let i = 0; i < state.breadcrumb.length; i++) {
                console.log('判断', state.breadcrumb[i].path)
                if (state.breadcrumb[i].path === value.path) return
            }
            state.breadcrumb.push(value)
        },
        delBreadCrumb (state, index) {
            state.breadcrumb.splice(index, 1)
        },
        clearBreadCrumb (state) {
            state.breadcrumb.splice(1, state.breadcrumb.length - 1)
        }
    }
}