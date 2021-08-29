<template>
	<div class="modal">
		<div class="modal-content">
			<div class="title">
				<slot name="title" />
				<Icon icon="close-circle-outline" @click="$emit('close-modal')" />
			</div>
			<div class="content">
				<slot name="content" />
			</div>
		</div>
		<div class="modal-backdrop" @click="$emit('close-modal')" />
	</div>
</template>
<style scoped>
.modal {
	position: fixed;
	z-index: 4;
	height: 100vh;
	width: 100vw;
	top: 0;
	right: 0;
	margin: 0 !important;
}
.modal-backdrop {
	position: absolute;
	height: 100vh;
	width: 100vw;
	top: 0;
	right: 0;
	background-color: var(--black);
	opacity: 0.5;
}
.modal-content {
	width: 90%;
	max-width: 500px;
	background-color: var(--white);
	position: absolute;
	top: 50%;
	left: 50%;
	z-index: 5;
	border-radius: var(--border-radius);
	transform: translate(-50%, -50%);
}
.title {
	background-color: var(--primary);
	color: var(--white);
	border-top-left-radius: var(--border-radius);
	border-top-right-radius: var(--border-radius);
	font-size: 1.2em;
	font-weight: bold;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.title:deep(.icon) {
	cursor: pointer;
}
.content {
	padding: 10px 20px;
}
</style>