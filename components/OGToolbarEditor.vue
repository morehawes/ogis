<script setup>
const props = defineProps({
	draw: {
		type: Object,
		required: true,
	},
});

console.log(props.draw);
</script>

<template>
	<div class="og-toolbar">
		<og-button text="Marker" icon="marker" @click="draw.setMode('point')" />
	</div>
</template>

<style></style>
