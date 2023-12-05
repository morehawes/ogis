<script setup>
// Import MapBox GL
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Import Terra Draw
import {
	TerraDraw,
	// TerraDrawArcGISMapsSDKAdapter,
	TerraDrawFreehandMode,
} from "terra-draw";

// Configuration
const id = "esri-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 16;
const apiKey = "132";

onMounted(() => {
	// Create Map
	// Create Terra Draw
	// const draw = new TerraDraw({
	// 	adapter: new TerraDrawArcGISMapsSDKAdapter({
	// 		lib: mapboxgl,
	// 		map,
	// 	}),
	// 	modes: [new TerraDrawFreehandMode()],
	// });
	// // Start drawing
	// draw.start();
	// draw.setMode("freehand");
});
</script>

<template>
	<div class="map" id="esri-map"></div>
</template>

<style></style>
