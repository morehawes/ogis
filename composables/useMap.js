// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

export function useMap(useConfig = {}) {
	const map = ref(null);
	const state = ref({ status: null });

	const config = ref({ mapEleID: null });

	//Required
	if (!useConfig.mapEleID) {
		console.error("useMap requires mapEleID");

		return;
	}

	// Merge useConfig into config
	config.value = { ...config.value, ...useConfig };

	onMounted(() => {
		// Leaflet
		// map.value = L.map(config.value.mapEleID, {
		// 	center: [50.702166, -127.844853],
		// 	zoom: 13, // starting zoom,
		// 	minZoom: 3,
		// 	maxZoom: 20,
		// 	tapTolerance: 10,
		// });

		// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		// 	maxZoom: 19,
		// 	attribution:
		// 		'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		// }).addTo(map.value);

		// Initialise MapLibre
		map.value = new MapLibreGL.Map({
			container: config.value.mapEleID,
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
			center: [-127.844853, 50.702166],
			zoom: 12,
			minZoom: 1,
			maxZoom: 20,
		});

		state.value.status = "init";
	});

	return {
		map,
		state,
	};
}
