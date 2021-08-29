<template>
	<div id="recipes">
		<Filters :filters="filters" />
		<div class="recipes-list" v-if="recipes.length && loading">
			<RecipeSkeleton :recipe="recipe" v-for="(recipe, index) in recipes" :key="index" />
		</div>
		<div class="recipes-list" v-if="recipes.length && !loading">
			<Recipe :recipe="recipe" v-for="(recipe, index) in recipes" :key="index" @click="currentRecipe = recipe" />
		</div>
		<p v-if="!recipes.length && loading">
			{{ $t('no-result') }}
		</p>
		<Pagination :pagination="pagination" @set-current-page="setCurrentPage" v-if="recipes.length && !loading" />
		<Modal v-if="currentRecipe" @closeModal="currentRecipe = null">
			<template #title>
				{{ currentRecipe.name }}
			</template>
			<template #content>
				<Description :recipe="currentRecipe" />
			</template>
		</Modal>
	</div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { Filters, Recipe, RecipeSkeleton, Description } from './components/'
export default {
	components : {
		Pagination,
		Filters,
		Recipe,
		RecipeSkeleton,
		Description
	},
	data() {
		return {
			recipes       : [],
			currentRecipe : null,
			pagination    : {
				currentPage : 1,
				pageCount   : null
			},
			loading      : false,
			firstLoading : true,
			filters      : [
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
		},
		random() {
			return Math.floor(Math.random() * 5) + 5
		}
	},
	async created() {
		this.recipes = this.initRecipes(new Array(20).fill({}))
		this.setPagination()
		this.initFilter()
		await this.loadRecipes()
	},
	methods : {
		async loadRecipes() {
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
					this.recipes = this.initRecipes(res.data.recipes)
					this.pagination.pageCount = parseInt(res.data.page_count)
					this.checkIfAllImagesIsLoaded()
				}).catch(() => {
					this.recipes = []
					this.loading = true
				})
		},
		setPagination() {
			const currentPage = parseInt(this.$route.query.p)
			if(!currentPage) return
			this.pagination.currentPage = currentPage
		},
		initFilter() {
			const filters = this.$route.query.filters
			if(!filters) return
			const filtersArray = filters.split(',')
			filtersArray.forEach(filter => {
				const find = this.filters.find(x => {
					return x.label == filter
				})
				if(find)
					find.active = true
			})
		},
		setCurrentPage(page) {
			this.pagination.currentPage = page
			this.$router.replace({
				path  : this.$route.path,
				query : {
					...this.$route.query,
					p : page
				}
			})
		},
		initRecipes(recipes) {
			return recipes.map((rec, i) => {
				return {
					...rec,
					bigger : (i % this.random == 0) && i < recipes.length - 5
				}
			})
		},
		checkIfAllImagesIsLoaded() {
			var imgLoaded = 0
			this.recipes.forEach(e => {
				const img = new Image()
				if(e.isBigger) img.src = `https://abonne.lescommis.com/${e.image}`
				else img.src = `https://abonne.lescommis.com/${e.image_wide_thumb_url}`
				img.onload = () => {
					imgLoaded++
					if(imgLoaded == this.recipes.length)
						this.loading = false
				}
			})
		}
	},
	watch : {
		filtersQuery() {
			this.pagination.currentPage = 1
			this.$router.replace({
				path  : this.$route.path,
				query : {
					...this.$route.query,
					p : 1
				}
			})
			this.loadRecipes()
		},
		currentPage() {
			if(!this.firstLoading) {
				this.loadRecipes()
			}
			this.firstLoading = false
		}
	}
}
</script>
<style scoped>
#recipes {
	height: fit-content;
	max-width: 1200px;
	padding: 0 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
}

@media screen and (max-width: 480px) {
	#recipes {
		padding: 0 10px;
	}
}
#recipes > * {
	margin: 10px 0;
}
.recipes-list {
	display: grid;
	grid-gap: 1rem;
	width: 100%;
	grid-template-rows: repeat(4, 1fr);
	grid-template-columns: repeat(4, 1fr);
}

@media screen and (max-width: 1000px) {
	.recipes-list {
		grid-template-rows: auto 1fr auto;
		grid-template-columns: repeat(3, 1fr);
	}
}

@media screen and (max-width: 800px) {
	.recipes-list {
		grid-template-rows: repeat(1, 1fr);
		grid-template-columns: repeat(2, 1fr);
	}
}
</style>