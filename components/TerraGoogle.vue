<script setup>
// Import OpenLayers
import { Loader } from "@googlemaps/js-api-loader";

const { lng, lat, zoom } = storeToRefs(useTerraStore());

// Get .env variables
const config = useRuntimeConfig();
const apiKey = config.public.GOOGLE_API_KEY;

const state = ref({
	features: [],
});

const id = "google-map";

onMounted(() => {
	const loader = new Loader({
		apiKey,
		version: "weekly",
	});

	loader.load().then((google) => {
		// Create Map
		const map = new google.maps.Map(document.getElementById(id), {
			disableDefaultUI: true,
			center: { lat: lat.value, lng: lng.value },
			zoom: zoom.value,
			clickableIcons: false,
			mapId: "google-map",
		});

		// Once Map loaded
		map.addListener("projection_changed", () => {
			// Create Terra Draw
			const { state: drawState } = useTerraDraw(
				new TerraDrawGoogleMapsAdapter({
					lib: google.maps,
					map,
				}),
			);

			state.value = drawState.value;
		});
	});
});

const features = computed(() => {
	return state.value?.features ?? [];
});
</script>

<template>
	<div class="wrap">
		<terra-map-menu title="Google Maps" :features="features" />

		<div class="map" id="google-map"></div>
	</div>
</template>

<style></style>
