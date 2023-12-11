<script setup>
// Import MapBox GL
import * as lib from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const { lng, lat, zoom } = storeToRefs(useTerraStore());

const state = ref({
	features: [],
});

// Configuration
const apiKey = "132";

onMounted(() => {
	// Create Map
	lib.accessToken = apiKey;
	const map = new lib.Map({
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
	const { init, state: drawState } = useTerraDraw();

	init(
		new TerraDrawMapboxGLAdapter({
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
		<terra-map-menu title="Mapbox" :features="features" />
		<div class="map" id="mapbox-map"></div>
	</div>
</template>

<style></style>
