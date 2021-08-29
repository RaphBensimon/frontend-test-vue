<template>
	<div class="recipe-skeleton" :style="getStyle" />
</template>
<script>
export default {
	props : {
		recipe : {
			type     : Object,
			required : true
		}
	},
	computed : {
		getStyle() {
			if(this.recipe.bigger)
				return 'grid-row: auto /span 2; '
			return ''
		},
	}
}
</script>
<style scoped>
.recipe-skeleton {
	width: 100%;
	height: 100%;
	padding-bottom: 68%;
	position: relative;
	background-color: var(--light-grey);
	border-radius: var(--border-radius);
	overflow: hidden;
}

@media screen and (max-width: 800px) {
	.recipe-skeleton {
		grid-row: auto / auto !important;
	}
}
.recipe-skeleton:after {
	content: '';
	background: linear-gradient(to left, transparent, rgba(255, 255, 255, 0.4), transparent);
	animation: skeleton-animate-wave 1.25s infinite;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

@keyframes skeleton-animate-wave {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(100%);
	}
}
</style>