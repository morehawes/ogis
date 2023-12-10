<script setup>
// Import MapBox GL
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const { getModes } = useTerraStore();
const { activeMode, lng, lat, zoom } = storeToRefs(useTerraStore());

const state = reactive({
	features: [],
});

// Configuration
const apiKey = "132";

onMounted(() => {
	// Create Map
	mapboxgl.accessToken = apiKey;
	const map = new mapboxgl.Map({
		container: "mapbox-map",
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
		center: [lng.value, lat.value],
		zoom: zoom.value,
	});

	// Create Terra Draw
	const draw = new TerraDraw({
		adapter: new TerraDrawMapboxGLAdapter({
			// lib: mapboxgl,
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
	<div class="wrap">
		<terra-map-menu title="Mapbox" :features="state.features" />
		<div class="map" id="mapbox-map"></div>
	</div>
</template>

<style></style>
