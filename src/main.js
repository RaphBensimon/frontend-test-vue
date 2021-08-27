import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import i18n from './translations/i18n.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import setRgbaColors from './utils/color'
const app = createApp(App)
setRgbaColors()
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
