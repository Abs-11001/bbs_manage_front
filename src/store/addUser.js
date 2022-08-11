export default {
    namespaced: true,
    state: {
        formData: {
            name: '',
            age: '',
            sex: '',
            birth: '',
            addr: ''
        }
    },
    mutations: {
        changeFormData (state, value) {
            // 必须要在这里判断 新旧的数据是否一样，如果一样就不赋值，不然会陷入无尽的循环之中
            if (JSON.stringify(value) === JSON.stringify(state.formData)) return
            state.formData = {...value}
        },
        clearFormData (state, flag){
            if (flag === 'add'){
                state.formData.name = ''
                state.formData.age = ''
                state.formData.sex = ''
                state.formData.birth = ''
                state.formData.addr = ''
            }
        }
    }
}