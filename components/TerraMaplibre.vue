<script setup>
// Import MapLibre
import * as lib from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const { lng, lat, zoom } = storeToRefs(useTerraStore());

const state = ref({
	features: [],
});

onMounted(() => {
	// Create Map
	const map = new lib.Map({
		container: "maplibre-map",
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
		new TerraDrawMapLibreGLAdapter({
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
		<terra-map-menu title="MapLibre" :features="features" />

		<div class="map" id="maplibre-map"></div>
	</div>
</template>

<style lang="less">
.wrap {
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;

	.map {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
