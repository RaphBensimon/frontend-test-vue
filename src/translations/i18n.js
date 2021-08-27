import { createI18n } from 'vue-i18n/index'
import messages from './messages.js'
const i18n = createI18n({
	locale : 'fr',
	messages
})
export default i18n