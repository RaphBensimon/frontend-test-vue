import Recipes from '@/views/recipes/Recipes.vue'
const routes = [
	{
		path     : '/:catchAll(.*)',
		redirect : '/recipes'
	},
	{
		path      : '/recipes',
		component : Recipes,
		meta      : {
			title : 'our recipes'
		}
	}
]
export default routes