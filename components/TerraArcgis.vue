<script setup>
// Import ArcGIS
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView.js";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Point from "@arcgis/core/geometry/Point";
import Polyline from "@arcgis/core/geometry/Polyline";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import Color from "@arcgis/core/Color";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

import "@arcgis/core/assets/esri/themes/light/main.css";

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
	const map = new Map({
		// Basemap layer service
		basemap: "osm",
	});

	const view = new MapView({
		map: map,
		center: [lng, lat],
		zoom: zoom,
		container: id,
	});

	// Create Terra Draw
	const draw = new TerraDraw({
		adapter: new TerraDrawArcGISMapsSDKAdapter({
			lib: {
				GraphicsLayer,
				Point,
				Polyline,
				Polygon,
				Graphic,
				SimpleLineSymbol,
				SimpleFillSymbol,
				SimpleMarkerSymbol,
				Color,
			},
			map: view,
		}),
		modes: [new TerraDrawFreehandMode()],
	});

	// Start drawing
	draw.start();
	draw.setMode("freehand");
});
</script>

<template>
	<div class="map" id="esri-map"></div>
</template>

<style></style>
