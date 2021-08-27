import Home from '@/views/home/Home.vue'
const routes = [
	{
		path     : '/:catchAll(.*)',
		redirect : '/'
	},
	{
		path      : '/',
		component : Home,
		meta      : {
			title : 'home'
		}
	}
]
export default routes