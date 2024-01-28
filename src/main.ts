import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import DefaultPreset from '@/presets/mastermind'
import router from '@/router'
import './style.css'
import 'primeicons/primeicons.css'

const app = createApp(App)
const store = createPinia()

store.use(({ store }) => {
  store.router = markRaw(router)
})
app.use(PrimeVue, {
  unstyled: true,
  pt: DefaultPreset,
})
app.use(router)
app.use(store)
app.mount('#app')
