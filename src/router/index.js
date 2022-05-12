import {createRouter, createWebHistory} from "vue-router";
import Login from "../pages/Login.vue";
import NoteBookList from "../pages/NoteBookList.vue";


// 路由配置对象
const routes = [
    {path: '/', component: Login},
    {path: '/notebooks', component: NoteBookList}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;
