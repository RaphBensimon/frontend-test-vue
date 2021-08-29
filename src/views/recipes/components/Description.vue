<template>
	<div class="description">
		<div class="image-container">
			<img :src="`https://abonne.lescommis.com/${recipe.image}`">
		</div>
		<div class="text">
			<p>
				{{ $t('ready-in') }} <b>{{ recipe.ready_time }}</b> {{ $t('minutes') }}
			</p>
			<p>
				{{ $t('time to spend in the kitchen') }} : <b>{{ recipe.furnace_time }}</b>
				{{ $t('minutes') }}
			</p>
			<p>
				<b>{{ $t('ingredients') }}</b> : {{ recipe.ingredients }}
			</p>
			<p>
				<b>{{ $t('utensils') }}</b> :
				<span>
					{{ recipe.tools }}
				</span>
			</p>
			<p>
				<b>{{ $t('calories') }} : </b>{{ recipe.calories }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props : {
		recipe : {
			type     : Object,
			required : true
		}
	}
}
</script>
<style scoped>
.description {
	display: flex;
	justify-content: space-between;
}
.description > .image-container {
	width: 39%;
}
.description > .text {
	width: 59%;
}
.image-container img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

@media screen and (max-width: 600px) {
	.description {
		flex-direction: column;
	}
	.description > .image-container {
		width: 100%;
	}
	.description > .text {
		width: 100%;
	}
}
</style>