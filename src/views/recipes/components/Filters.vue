<template>
	<div class="filters">
		<div class="filter" :class="{'active': filter.active}" v-for="(filter, i) in filters" :key="i"
			@click="toggleActive(filter)">
			{{ filter.label }}
		</div>
	</div>
</template>
<script>
export default {
	props : {
		filters : {
			required : true,
			type     : Object
		}
	},
	created() {
	},
	methods : {
		toggleActive(filter) {
			filter.active = !filter.active
			var filters = this.$route.query.filters
			if(filters) {
				const filtersArray = filters.split(',')
				const findIndex = filtersArray.findIndex(x => {
					return x === filter.label
				})
				if(findIndex != -1) filtersArray.splice(findIndex, 1)
				else filtersArray.push(filter.label)
				filters = filtersArray.join(',')
			} else {
				filters = filter.label
			}
			const query = {
				...this.$route.query,
				filters : filters
			}
			if(!query['filters']) delete query['filters']
			this.$router.push({
				path  : this.$route.path,
				query : query
			})
		}
	}
}
</script>
<style scoped>
.filters {
	display: flex;
	font-weight: bold;
	justify-content: center;
	flex-wrap: wrap;
}
.filter {
	padding: 10px 20px;
	margin: 5px 10px;
	border: 2px solid var(--primary);
	border-radius: var(--border-radius);
	cursor: pointer;
	color: var(--primary);
	width: 100px;
	text-align: center;
	text-transform: capitalize;
	transition: calc(var(--transition) / 2);
}
.filter:hover {
	background-color: var(--primary-light);
	border-color: var(--primary-light);
	color: var(--white);
}
.filter.active {
	background-color: var(--primary);
	color: var(--white);
}
</style>