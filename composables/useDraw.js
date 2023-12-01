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
	const draw = ref(null);

	const config = ref({ map: null });
	const state = ref({ status: null });

	// Initialise Terra Draw
	const init = (useConfig = {}) => {
		//Required
		if (!useConfig.map) {
			return;
		} else {
			console.debug(`useDraw init: ${useConfig.map}`);
		}

		// Merge useConfig into config
		config.value.forEach((value, key) => {
			// Iff allowable key
			if (useConfig[key]) {
				config.value.key = useConfig[key];
			}
		});

		// Initialize Terra Draw
		draw.value = new TerraDraw({
			adapter: new TerraDrawMapLibreGLAdapter({
				lib: MapLibreGL,
				map: config.value.map,
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
		draw.value.start();

		// Set the mode to polygon
		draw.value.setMode("polygon");

		state.value.status = "init";
	};

	return {
		draw,
		init,
		state,
	};
}
