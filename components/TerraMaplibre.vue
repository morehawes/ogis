<script setup>
// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawMapLibreGLAdapter,
	TerraDrawFreehandMode,
	TerraDrawLineStringMode,
	TerraDrawCircleMode,
	TerraDrawGreatCircleMode,
	TerraDrawPointMode,
	TerraDrawPolygonMode,
	TerraDrawRectangleMode,
	TerraDrawSelectMode,
	// TerraDrawRenderMode,
} from "terra-draw";

// Configuration
const id = "maplibre-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 16;

let draw = null;
const modes = [
	new TerraDrawFreehandMode(),
	new TerraDrawLineStringMode(),
	new TerraDrawCircleMode(),
	new TerraDrawGreatCircleMode(),
	new TerraDrawPointMode(),
	new TerraDrawPolygonMode(),
	new TerraDrawRectangleMode(),
	new TerraDrawSelectMode(),
	// new TerraDrawRenderMode({
	// 	modeName: "render",
	// }),
];

const state = reactive({
	activeMode: "select",
	features: [],
});

watch(state, (oldValue, newValue) => {
	console.log("TerraMaplibre.vue: watch state: ", oldValue, newValue);

	if (draw) {
		draw.setMode(state.activeMode);
	}
});

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
	draw = new TerraDraw({
		adapter: new TerraDrawMapLibreGLAdapter({
			lib: MapLibreGL,
			map,
		}),
		modes,
	});

	// Events
	draw.on("change", (ids, type) => {
		console.log("TerraMaplibre.vue: change: ", ids, type);

		//Done editing
		if (type === "delete") {
			// Get the Store snapshot
			state.features = draw.getSnapshot();
		}
	});

	// Start drawing
	draw.start();
	draw.setMode(state.activeMode);
});
</script>

<template>
	<div class="wrap">
		<terra-map-menu
			title="MapLibre"
			:modes="modes"
			:features="state.features"
			v-model:activeMode="state.activeMode"
		/>

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
