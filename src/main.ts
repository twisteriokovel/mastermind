import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import DefaultPreset from '@/presets/mastermind'
import router from '@/router'

const app = createApp(App)

app.use(PrimeVue, {
  unstyled: true,
  pt: DefaultPreset,
})
app.use(router)
app.mount('#app')
