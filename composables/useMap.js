// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

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
			center: [-124.958499, 49.641845],
			zoom: 10,
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
