<template>
	<div id="recipes">
		<div class="filters">
			<Filter v-for="(filter, i) in filters" :key="i" :filter="filter" />
		</div>
		<div class="recipes">
			<Recipes v-for="(recipe, i) in recipes" :key="i" :recipe="recipe" />
		</div>
		<Pagination :pagination="pagination" />
	</div>
</template>
<script>
export default {
	data() {
		return {
			recipes    : [],
			pagination : {
				currentPage : 1,
				pageCount   : null
			},
			filters : [
				{
					label  : 'creative',
					active : false
				},
				{
					label  : 'healthy',
					active : false
				}
			]
		}
	},
	async created() {
		this.setPagination()
		this.setFilter()
		await this.getRecipes()
	},
	methods : {
		getRecipes() {
			let filtersQuery = '?'
			this.filters.forEach((filter, i) => {
				if(filter.active) {
					let ampersand  = ''
					if(i > 0) ampersand  +='&'
					filtersQuery += `${ampersand}${filter.label}=true`
				}
			})
			this.axios.get(`https://abonne.lescommis.com/api/cookbook_recipes/${this.pagination.currentPage}
			/${filtersQuery}`)
				.then(res => {
					this.recipes = res.data.recipes
					this.pagination.pageCount = res.data.page_count
				}).catch(err => {
					console.log(err)
				})
		},
		setPagination() {
			const currentPage = this.$route.query.currentPage
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

	}
}
</script>