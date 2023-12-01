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
		<og-button text="Line" icon="polyline" @click="draw.setMode('linestring')" />
		<og-button text="Polygon" icon="polygon" @click="draw.setMode('polygon')" />
		<og-button text="Circle" icon="circle" @click="draw.setMode('circle')" />
		<og-button text="Rectangle" icon="rectangle" @click="draw.setMode('rectangle')" />
		<og-button text="Freehand" icon="freehand" @click="draw.setMode('freehand')" />
		<og-button text="Great Circle" icon="greatcircle" @click="draw.setMode('greatcircle')" />
		<og-button text="Select" icon="select" @click="draw.setMode('select')" />
		<og-button text="Clear" icon="clear" @click="draw.clear()" />
	</div>
</template>

<style></style>
