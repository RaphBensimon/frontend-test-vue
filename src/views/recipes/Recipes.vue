<template>
	<div id="recipes">
		<Filters :filters="filters" />
		<Spinner variant="primary" v-if="loading" />
		<Recipes :recipes="recipes" v-else />
		<Pagination :pagination="pagination" />
	</div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { Filters, Recipes } from './components/'
export default {
	components : {
		Pagination,
		Filters,
		Recipes
	},
	data() {
		return {
			recipes    : [],
			pagination : {
				currentPage : 1,
				pageCount   : null
			},
			loading : false,
			filters : [
				{
					label  : 'creative',
					active : false
				},
				{
					label  : 'healthy',
					active : false
				},
				{
					label  : 'gourmand',
					active : false
				},
				{
					label  : 'veggie',
					active : false
				},
				{
					label  : 'nutrition',
					active : false
				},
				{
					label  : 'efficace',
					active : false
				},
				{
					label  : 'rapide',
					active : false
				},
			]
		}
	},
	computed : {
		currentPage() {
			return this.pagination.currentPage
		},
		filtersQuery() {
			return this.$route.query.filters
		}
	},
	async mounted() {
		this.setPagination()
		this.setFilter()
		await this.getRecipes()
	},
	methods : {
		getRecipes() {
			this.loading = true
			let filtersQuery = '?'
			this.filters.forEach((filter, i) => {
				if(filter.active) {
					let ampersand  = ''
					if(i > 0) ampersand  += '&'
					filtersQuery += `${ampersand}${filter.label}=true`
				}
			})
			this.axios.get(`https://abonne.lescommis.com/api/cookbook_recipes/${this.pagination.currentPage}
			/${filtersQuery}`)
				.then(res => {
					this.recipes = res.data.recipes
					this.pagination.pageCount = res.data.page_count
					this.loading = false
				}).catch(err => {
					console.log(err)
					this.loading = false
				})
		},
		setPagination() {
			const currentPage = this.$route.query.p
			if(!currentPage) return
			this.pagination.currentPage = currentPage
		},
		setFilter() {
			const filters = this.$route.query.filters
			if(!filters) return
			const filtersArray = filters.split(',')
			filtersArray.forEach(filter => {
				const find = this.filters.find(x => {
					return x.label == filter
				})
				find.active = true
			})
		}
	},
	watch : {
		filtersQuery() {
			this.pagination.currentPage = 1
			this.getRecipes()
		},
	}
}
</script>
<style scoped>
#recipes {
	height: 100%;
	max-width: 1200px;
	position: relative;
	left: 50%;
	transform: translateX(-50%);
}
/deep/.spinner {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

}
</style>