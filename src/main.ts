import { createApp } from 'vue'
import naive from 'naive-ui'
import Maska from 'maska'
import './styles'
import 'vue-toast-notification/dist/theme-sugar.css';
import router from './router'
import { i18n } from './plugins/i18n'
import App from './App.vue'
import globalMethods from './globals/index'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth'
import ApiService from './services/api'
const pinia = createPinia()
const app = createApp(App)
app.use(Maska)
globalMethods(app)
app
    .use(router)
    .use(naive)
    .use(i18n)
    .use(pinia)
    .mount('#app')


const { isAuthenticated } = useAuthStore()
ApiService.init(import.meta.env.VITE_API_API_URL, router)
ApiService.mount401Interceptor()
if (isAuthenticated) {
    ApiService.setHeader()
}