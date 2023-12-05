<script setup>
// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawMapLibreGLAdapter,
	TerraDrawFreehandMode,
} from "terra-draw";

// Configuration
const id = "maplibre-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 16;

onMounted(() => {
	// Create Map
	const map = new MapLibreGL.Map({
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
		adapter: new TerraDrawMapLibreGLAdapter({
			lib: MapLibreGL,
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
	<div class="map" id="maplibre-map"></div>
</template>

<style></style>
