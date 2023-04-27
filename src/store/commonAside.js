import Cookie from 'js-cookie'
export default {
    namespaced: true,
    state: {
        isCollapse: false,
        menu: []
    },
    actions: {

    },
    mutations: {
        Toggle_Menu_Collapse(state){
            state.isCollapse = !state.isCollapse
        },
        setMenu (state, menu) {
            state.menu = menu
            Cookie.set('menu', JSON.stringify(menu))
        },
        clearMenu (state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addRouter (state, router) {
            if (!Cookie.get('menu')) return
            state.menu = JSON.parse(Cookie.get('menu'))
            const menu = state.menu
            const newMenu = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../pages/${item.url}`)
                        if (item.path[0] === '/') item.path = item.path.substr(1,item.path.length)
                        return item
                    })
                    newMenu.push(...item.children)
                } else {
                    item.component = () => import(`../pages/${item.url}`)
                    if (item.path[0] === '/') item.path = item.path.substr(1,item.path.length)
                    newMenu.push(item)
                }
            })
            newMenu.forEach(item => {
                router.addRoute('main', item)
            })
        }
    },
}