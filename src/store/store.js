import { createStore } from 'vuex'
import module from './modules/module'
const store = createStore({
	modules : {
		module
	}
})
export default store