<script setup>
//Import Leaflet
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const { getModes } = useTerraStore();
const { activeMode, lng, lat, zoom } = storeToRefs(useTerraStore());

const state = reactive({
	features: [],
});

onMounted(() => {
	// Create Map
	const map = L.map("leaflet-map", {
		center: [lat.value, lng.value],
		zoom: zoom.value,
	});

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(map);

	// Create Terra Draw
	const draw = new TerraDraw({
		adapter: new TerraDrawLeafletAdapter({
			lib: L,
			map,
		}),
		modes: getModes(),
	});

	// Events
	draw.on("change", (ids, type) => {
		//Done editing
		if (type === "delete") {
			// Get the Store snapshot
			state.features = draw.getSnapshot();
		}
	});

	// Start drawing
	draw.start();
	draw.setMode(activeMode.value);

	// Watch for changes
	watch(activeMode, () => {
		draw.setMode(activeMode.value);
	});
});
</script>

<template>
	<div class="map" id="leaflet-map"></div>
</template>

<style></style>
