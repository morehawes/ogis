<script setup>
// Import OpenLayers
import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { fromLonLat, toLonLat } from "ol/proj";
import "ol/ol.css";

const { activeMode, lng, lat, zoom } = storeToRefs(useTerraStore());

const state = reactive({
	features: [],
});

onMounted(() => {
	const map = new Map({
		layers: [
			new TileLayer({
				source: new OSM(),
			}),
		],
		target: "openlayers-map",
		view: new View({
			center: fromLonLat([lng.value, lat.value]),
			zoom: zoom.value,
		}),
		controls: [],
	});

	map.once("postrender", () => {
		// Create Terra Draw
		const draw = new TerraDraw({
			adapter: new TerraDrawOpenLayersAdapter({
				lib: {
					Circle,
					Feature,
					GeoJSON,
					Style,
					VectorLayer,
					VectorSource,
					Stroke,
					toLonLat,
					CircleStyle,
				},
				map,
				coordinatePrecision: 9,
			}),
			// modes: getModes(),
		});
		// Start drawing
		draw.start();

		// Watch for changes
		watch(activeMode, () => {
			draw.setMode(activeMode.value);
		});
		draw.setMode(activeMode.value);
	});
});
</script>

<template>
	<div class="wrap">
		<terra-map-menu title="Open Layers" :features="state.features" />

		<div class="map" id="openlayers-map"></div>
	</div>
</template>

<style></style>
