// Import MapLibre
import MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

let map = reactive(null);
const config = reactive(new Map([["mapEleID", null]]));
const state = reactive(new Map([["status", null]]));

export function useMap() {
	// Initialise MapLibre
	const init = (useConfig = {}) => {
		//Required
		if (!useConfig.mapEleID) {
			console.error("useMap requires mapEleID");

			return;
		}

		// Merge useConfig into config
		config.forEach((value, key) => {
			// Iff allowable key
			if (useConfig[key]) {
				config.set(key, useConfig[key]);

				console.debug(`useMap init: ${key} ${useConfig[key]}`);
			}
		});

		// Initialise MapLibre
		map = new MapLibreGL.Map({
			container: config.get("mapEleID"),
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
			center: [0, 0],
			zoom: 0,
			minZoom: 1,
			maxZoom: 20,
		});

		state.set("status", "init");
	};

	return {
		map,
		state,
		init,
	};
}
