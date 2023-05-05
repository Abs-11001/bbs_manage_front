import Vue from 'vue'
import VueRouter from "vue-router";
import {
    Button,
    Container,
    Aside,
    Header,
    Main,
    Radio,
    RadioButton,
    RadioGroup,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Card,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Form,
    FormItem,
    Input,
    Switch,
    Select,
    Option,
    DatePicker,
    TimePicker,
    Dialog,
    Message,
    MessageBox,
    // Notification,
    Checkbox,
    Pagination,
    Link,
    Loading,
    Image,
    Tooltip,
    Upload,
} from "element-ui";
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VueRouter)
Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Header)
Vue.use(Main)
Vue.use(Radio)
Vue.use(RadioButton)
Vue.use(RadioGroup)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(Pagination)
// Vue.use(Notification)
Vue.use(Checkbox)
Vue.use(Link)
Vue.use(Loading)
Vue.use(Image)
Vue.use(Tooltip)
Vue.use(Upload)


Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

Vue.config.productionTip = false



new Vue({
    render: h => h(App),
    router,
    store,
    created () {
        // 当页面刷新一次的时候就会重新创建出来一个vue事例，然后代码逻辑是从cookie中去获取，哪怕换了账号去登陆，logind的时候也会重新配置新的动态路由
        store.commit('asideAbout/addRouter', router)
        console.log('create')
    }
}).$mount('#app')
