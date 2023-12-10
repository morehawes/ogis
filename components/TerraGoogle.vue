<script setup>
// Import OpenLayers
import { Loader } from "@googlemaps/js-api-loader";

const { getModes } = useTerraStore();
const { activeMode, lng, lat, zoom } = storeToRefs(useTerraStore());

// Get .env variables
const config = useRuntimeConfig();
const apiKey = config.public.GOOGLE_API_KEY;

const state = reactive({
	features: [],
});

const id = "google-map";

onMounted(() => {
	const loader = new Loader({
		apiKey,
		version: "weekly",
	});

	loader.load().then((google) => {
		const map = new google.maps.Map(document.getElementById(id), {
			disableDefaultUI: true,
			center: { lat: lat.value, lng: lng.value },
			zoom: zoom.value,
			clickableIcons: false,
			mapId: "google-map",
		});

		map.addListener("projection_changed", () => {
			const draw = new TerraDraw({
				adapter: new TerraDrawGoogleMapsAdapter({
					lib: google.maps,
					map,
					coordinatePrecision: 9,
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
	});
});
</script>

<template>
	<div class="wrap">
		<terra-map-menu title="Google Maps" :features="state.features" />

		<div class="map" id="google-map"></div>
	</div>
</template>

<style></style>
