import {createRouter, createWebHistory} from "vue-router";
import Login from "../pages/Login.vue";
import NoteBookList from "../pages/NoteBookList.vue";
import Home from "../pages/Home";
import NoteDetail from "../pages/NoteDetail";
import TrashDetail from "../pages/TrashDetail";


// 路由配置对象
const routes = [
    {path: '/', component: Login},
    {path: '/home',component: Home},
    {path: '/notebooks', component: NoteBookList},
    {path: '/note', component: NoteDetail},
    {path: '/trash', component: TrashDetail},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;
