<script setup>
//Import Leaflet
import * as lib from "leaflet";
import "leaflet/dist/leaflet.css";

const { lng, lat, zoom } = storeToRefs(useTerraStore());

const state = ref({
	features: [],
});

onMounted(() => {
	// Create Map
	const map = lib.map("leaflet-map", {
		center: [lat.value, lng.value],
		zoom: zoom.value,
	});

	lib
		.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		})
		.addTo(map);

	// Create Terra Draw
	const { state: drawState } = useTerraDraw(
		new TerraDrawLeafletAdapter({
			lib,
			map,
		}),
	);

	state.value = drawState.value;
});

const features = computed(() => {
	return state.value?.features ?? [];
});
</script>

<template>
	<div class="wrap">
		<terra-map-menu title="Leaflet" :features="features" />

		<div class="map" id="leaflet-map"></div>
	</div>
</template>

<style></style>
