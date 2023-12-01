<script setup>
const { init, state } = useMapStore();

onMounted(() => {
	init();
});
</script>

<template>
	{{ state.status }}
	<div id="map" />
</template>

<style></style>
