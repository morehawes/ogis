<script setup>
// Import OpenLayers
import { Loader } from "@googlemaps/js-api-loader";

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawGoogleMapsAdapter,
	TerraDrawFreehandMode,
} from "terra-draw";

// Configuration
const id = "google-map";
const lng = -1.826252;
const lat = 51.179026;
const zoom = 17;
const apiKey = "AIzaSyD5hio48OlLddo44UcyVELJgvZGXr6LN2E";

onMounted(() => {
	const loader = new Loader({
		apiKey,
		version: "weekly",
	});

	loader.load().then((google) => {
		const map = new google.maps.Map(document.getElementById(id), {
			disableDefaultUI: true,
			center: { lat, lng },
			zoom: zoom,
			clickableIcons: false,
			mapId: id,
		});

		map.addListener("projection_changed", () => {
			const draw = new TerraDraw({
				adapter: new TerraDrawGoogleMapsAdapter({
					lib: google.maps,
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
});
</script>

<template>
	<div class="map" id="google-map"></div>
</template>

<style></style>
