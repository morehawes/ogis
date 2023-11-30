<script setup>
defineProps({
	buttons: {
		type: Array,
		required: true,
	},
});
</script>

<template>
	<div class="og-toolbar">
		<og-icon
			v-for="(button, index) in buttons"
			:key="index"
			:name="button.icon"
			:size="button.size"
			:color="button.color"
		></og-icon>
	</div>
</template>

<style></style>
