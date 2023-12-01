<script setup>
onMounted(() => {
	const mapStore = useMapStore();
	mapStore.init();
});
</script>

<template>
	<div id="map" />
</template>

<style></style>
