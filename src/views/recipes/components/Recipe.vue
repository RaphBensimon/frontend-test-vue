<template>
	<li class="recipe" :style="getStyle">
		<img :src="getSrc" :alt="recipe.name">
		<p>{{ recipe.name }}</p>
	</li>
</template>
<script>
export default {
	props : {
		recipe : {
			required : true,
			type     : Object
		},
	},
	computed : {
		getStyle() {
			if(this.recipe.bigger)
				return 'grid-row: auto /span 2; '
			return ''
		},
		getSrc() {
			if(this.recipe.biger)
				return `https://abonne.lescommis.com/${this.recipe.image}`
			else
				return `https://abonne.lescommis.com/${this.recipe.image_wide_thumb_url}`
		}
	},
	methods : {
	}
}
</script>
<style scoped>
.recipe {
	position: relative;
	cursor: pointer;
}

@media screen and (max-width: 800px) {
	.recipe {
		grid-row: auto / auto !important;
	}
}
.recipe:hover:after {
	opacity: 0;
}
.recipe:after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--black);
	opacity: 0.25;
	z-index: 1;
	transition: var(--transition);
}
.recipe p {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 80%;
	font-weight: bold;
	margin: 0;
	font-size: 1.2em;
	color: var(--white);
	z-index: 2;
	transform: translate(-50%, -50%);
}
.recipe img {
	border-radius: var(--border-radius);
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>