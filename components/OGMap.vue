<script setup>
onMounted(() => {
	const { init } = useMapStore();
	init();
});
</script>

<template>
	<div id="map" />
</template>

<style></style>
