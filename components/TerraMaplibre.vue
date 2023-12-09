<script setup>
// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const { modes } = useTerraStore();
const { activeMode, lng, lat, zoom } = storeToRefs(useTerraStore());

const state = reactive({
	features: [],
});

onMounted(() => {
	// Create Map
	const map = new MapLibreGL.Map({
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
	const draw = new TerraDraw({
		adapter: new TerraDrawMapLibreGLAdapter({
			lib: MapLibreGL,
			map,
		}),
		modes,
	});

	// Watch for changes
	watch(activeMode, () => {
		draw.setMode(activeMode.value);
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
});
</script>

<template>
	<div class="wrap">
		<terra-map-menu title="MapLibre" :features="state.features" />

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
