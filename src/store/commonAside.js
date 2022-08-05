export default {
    namespaced: true,
    state: {
        isCollapse: false,
    },
    actions: {

    },
    mutations: {
        Toggle_Menu_Collapse(state){
            state.isCollapse = !state.isCollapse
        },
    },
}