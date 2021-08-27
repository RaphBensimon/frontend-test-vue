<template>
	<div class="recipes">
		<div class="recipe" v-for="(recipe, i) in recipes" :key="i">
			<div>{{ recipe }}</div>
		</div>
	</div>
</template>
<script>
export default {
	props : {
		recipes : {
			required : true,
			type     : Object
		}
	}
}
</script>