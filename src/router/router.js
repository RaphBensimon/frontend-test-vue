import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/routes.js'
import i18n from '@/translations/i18n.js'

const router = createRouter({
	history : createWebHistory(),
	routes,
})
router.beforeEach((to) => {
	document.title = i18n.global.t(to.meta.title) + ' | DEFAULT_TITLE'
})
export default router