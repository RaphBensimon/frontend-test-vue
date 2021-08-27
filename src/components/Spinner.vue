<template>
	<div class="spinner" :class="`${variant} ${size}`" />
</template>
<script>
export default {
	props : {
		variant : {
			type     : String,
			required : false,
			default  : 'primary'
		},
		size : {
			type     : String,
			required : false,
			default  : ''
		}
	}
}
</script>
<style scoped>
.spinner {
	display: flex;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	animation: spinner-border 0.75s linear infinite;
}
.spinner.white {
	border: 0.4em solid var(--white-opacity-25);
	border-bottom-color: var(--white);
}
.spinner.primary {
	border: 0.4em solid var(--primary-opacity-25);
	border-bottom-color: var(--primary);
}

@keyframes spinner-border {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>