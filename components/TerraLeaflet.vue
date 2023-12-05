<script setup>
//Import Leaflet
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawLeafletAdapter,
	TerraDrawFreehandMode,
} from "terra-draw";

// Configuration
const id = "leaflet-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 16;

onMounted(() => {
	// Create Map
	const map = L.map(id, {
		center: [lat, lng],
		zoom: zoom,
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
		modes: [new TerraDrawFreehandMode()],
	});

	// Start drawing
	draw.start();
	draw.setMode("freehand");
});
</script>

<template>
	<div class="map" id="leaflet-map"></div>
</template>

<style></style>
