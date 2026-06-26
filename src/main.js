import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore.js'

const app = createApp(App)
const pinia = createPinia()     

app.use(router)
app.use(pinia)

const authStore = useAuthStore()
await authStore.initialiserSession()

app.mount('#app')

