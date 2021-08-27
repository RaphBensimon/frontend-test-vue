import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import i18n from './translations/i18n.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import setRgbaColors from './utils/color'
import Spinner from './components/Spinner'
const app = createApp(App)
app.component('Spinner', Spinner)
setRgbaColors()
app.use(VueAxios, axios)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
