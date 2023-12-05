<script setup>
// Import MapBox GL
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawMapboxGLAdapter,
	TerraDrawFreehandMode,
} from "terra-draw";

// Configuration
const id = "mapbox-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 16;
const apiKey = "132";

onMounted(() => {
	// Create Map
	mapboxgl.accessToken = apiKey;
	const map = new mapboxgl.Map({
		container: id,
		style: {
			version: 8,
			sources: {
				"osm-tiles": {
					type: "raster",
					tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
					tileSize: 256,
					attribution:
						'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
				},
			},
			layers: [
				{
					id: "osm-tiles",
					type: "raster",
					source: "osm-tiles",
				},
			],
		},
		center: [lng, lat],
		zoom: zoom,
	});

	// Create Terra Draw
	const draw = new TerraDraw({
		adapter: new TerraDrawMapboxGLAdapter({
			// lib: mapboxgl,
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
	<div class="map" id="mapbox-map"></div>
</template>

<style></style>
