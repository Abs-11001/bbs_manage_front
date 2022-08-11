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
            for (let i = 0; i < state.breadcrumb.length; i++) {
                if (state.breadcrumb[i].path === value.path) return
            }
            state.breadcrumb.push(value)
        },
        delBreadCrumb (state, index) {
            state.breadcrumb.splice(index, 1)
        }
    }
}