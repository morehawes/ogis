<script setup>
const { init, state } = useMapStore();

onMounted(() => {
	init();
});
</script>

<template>
	<div id="map" />
</template>

<style></style>
