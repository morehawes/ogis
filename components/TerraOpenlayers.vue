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

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawOpenLayersAdapter,
	TerraDrawFreehandMode,
} from "terra-draw";

// Configuration
const id = "openlayers-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 17;

onMounted(() => {
	const map = new Map({
		layers: [
			new TileLayer({
				source: new OSM(),
			}),
		],
		target: id,
		view: new View({
			center: fromLonLat([lng, lat]),
			zoom: zoom,
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
			modes: [new TerraDrawFreehandMode()],
		});

		// Start drawing
		draw.start();
		draw.setMode("freehand");
	});
});
</script>

<template>
	<div class="map" id="openlayers-map"></div>
</template>

<style></style>
