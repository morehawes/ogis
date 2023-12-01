import MapLibreGL from "maplibre-gl";

// Import Terra Draw
import {
	TerraDraw,
	TerraDrawMapLibreGLAdapter,
	TerraDrawSelectMode,
	TerraDrawPolygonMode,
	TerraDrawPointMode,
	TerraDrawLineStringMode,
	TerraDrawGreatCircleMode,
	TerraDrawFreehandMode,
	TerraDrawCircleMode,
	TerraDrawRectangleMode,
} from "terra-draw";

export function useDraw() {
	const config = reactive(
		new Map([
			["map", null],
			["lib", null],
		]),
	);

	const state = reactive(new Map([["status", null]]));
	const draw = reactive(null);

	// Initialise Terra Draw
	const init = (useConfig = {}) => {
		//Required
		if (!useConfig.map || !useConfig.lib) {
			console.error("useDraw requires a map and lib");

			return;
		}

		// Merge useConfig into config
		config.forEach((value, key) => {
			// Iff allowable key
			if (useConfig[key]) {
				config.set(key, useConfig[key]);
			}
		});

		console.debug("useDraw init: " + JSON.stringify(config));

		// Initialize Terra Draw
		const terraDraw = new TerraDraw({
			adapter: new TerraDrawMapLibreGLAdapter({
				lib: MapLibreGL,
				map: mapLibreMap,
				//coordinatePrecision: 9,
			}),

			// Modes
			modes: [
				//Select
				new TerraDrawSelectMode({
					// Mode features
					flags: {
						// polygon
						polygon: {
							feature: {
								scaleable: true,
								rotateable: true,
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
					},
				}),

				// Polygon
				new TerraDrawPolygonMode({
					allowSelfIntersections: false,
					pointerDistance: 30,
				}),

				// Point
				new TerraDrawPointMode({
					// The radius of the point
					radius: 20,
				}),

				// Line String
				new TerraDrawLineStringMode({
					// The radius of the point
					radius: 20,
				}),

				// Great Circle
				new TerraDrawGreatCircleMode({
					// The radius of the point
					radius: 20,
				}),

				// Freehand
				new TerraDrawFreehandMode({
					// The radius of the point
					radius: 20,
				}),

				// Circle
				new TerraDrawCircleMode({
					// The radius of the point
					radius: 20,
				}),

				// Rectangle
				new TerraDrawRectangleMode({
					// The radius of the point
					radius: 20,
				}),
			],
		});

		// Start drawing
		draw.start();

		// Set the mode to polygon
		draw.setMode("polygon");

		// Destructure terraDraw into draw
		({ ...draw } = terraDraw);

		state.set("status", "init");
	};

	return {
		draw,
		state,
		init,
	};
}
