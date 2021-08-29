<template>
	<div class="pagination">
		<div class="page" v-if="pagination.currentPage > 1"
			@click="setCurrentPage(pagination.currentPage - 1)">
			{{ $t('previous') }}
		</div>
		<div class="page" v-if="pagination.currentPage > 2"
			@click="setCurrentPage(1)">
			1
		</div>
		<div class="page three-point" v-if="pagination.currentPage > 2">
			...
		</div>
		<div class="page" v-for="index in pages" :key="index" @click="setCurrentPage(index)"
			:class="{'current-page': pagination.currentPage === index}">
			{{ index }}
		</div>
		<div class="page three-point" v-if="pagination.currentPage + 1 < pagination.pageCount">
			...
		</div>
		<div class="page" v-if="pagination.currentPage + 1 < pagination.pageCount"
			@click="setCurrentPage(pagination.pageCount)">
			{{ pagination.pageCount }}
		</div>
		<div class="page" v-if="pagination.currentPage < pagination.pageCount"
			@click="setCurrentPage(pagination.currentPage + 1)">
			{{ $t('next') }}
		</div>
	</div>
</template>
<script>
export default {
	emits : [
		'set-current-page'
	],
	props : {
		pagination : {
			required : true,
			type     : Object
		}
	},
	computed : {
		pages() {
			const range = []
			const length = Math.min(this.pagination.currentPage + 1, this.pagination.pageCount)
			for (let i = this.pagination.currentPage - 1; i <= length; i++) {
				if(i > 0)
					range.push(i)
			}
			return range
		},
	},
	methods : {
		setCurrentPage(index) {
			this.$router.replace({
				path  : this.$route.path,
				query : {
					...this.$route.query,
					p : index
				}
			})
			this.$emit('set-current-page', index)
			window.scroll(0, 0)
		}
	}
}
</script>
<style scoped>
.pagination {
	display: flex;
}
.page {
	margin: 0 3px;
	padding: 10px;
	border: 2px solid var(--primary);
	color: var(--primary);
	cursor: pointer;
	border-radius: var(--border-radius);
}
.current-page,
.page:not(.three-point):hover {
	background: var(--primary);
	color: var(--white);
}
.three-point {
	color: var(--grey);
}

</style>