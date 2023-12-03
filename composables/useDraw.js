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

	const { map } = storeToRefs(useMapStore());

	const state = ref({ status: null });

	// Initialise Terra Draw
	onMounted(() => {
		console.debug("useDraw onMounted");

		// Initialize Terra Draw
		draw.value = new TerraDraw({
			adapter: new TerraDrawMapLibreGLAdapter({
				lib: MapLibreGL,
				map: map.value,
				//coordinatePrecision: 9,
			}),

			// Modes
			modes: [
				//Select
				new TerraDrawSelectMode({
					// dragEventThrottle?: number;
					// keyEvents?: null | TerraDrawSelectModeKeyEvents;
					// pointerDistance?: number;

					// Mode features
					flags: {
						arbitary: {
							feature: {},
						},
						polygon: {
							feature: {
								draggable: true,
								rotateable: true,
								scaleable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
						// freehand: {
						// 	feature: { draggable: true, coordinates: {} },
						// },
						linestring: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
						// circle: {
						// 	feature: {
						// 		draggable: true,
						// 	},
						// },
						point: {
							feature: {
								draggable: true,
							},
						},
					},
					styles: {
						selectedPolygonColor: "#222222", // Any hex color you like
						selectedPolygonFillOpacity: 0.7, // 0 - 1
						selectedPolygonOutlineColor: "#333333", // Any hex color you like
						selectedPolygonOutlineWidth: 2, // Integer
					},
				}),

				// Polygon
				new TerraDrawPolygonMode({
					allowSelfIntersections: false,
					pointerDistance: 30,
					// keyEvents?: null | TerraDrawPolygonModeKeyEvents;
					//      snapping?: boolean;
					styles: {
						fillColor: "red",
						fillOpacity: 0.6,
						outlineColor: "#000",
						polygonOutlineWidth: 2,
					},
				}),

				// Point
				new TerraDrawPointMode({
					// The radius of the point
					styles: {
						pointColor: "rgba(0, 0, 0, 0.5)",
						pointWidth: 5,
						pointOutlineColor: "red",
						pointOutlineWidth: 2,
					},
				}),

				// Line String
				new TerraDrawLineStringMode({
					// allowSelfIntersections?: boolean;
					// keyEvents?: null | TerraDrawLineStringModeKeyEvents;
					// pointerDistance?: number;
					// snapping?: boolean;
					// styles?: Partial<LineStringStyling>;

					styles: {
						lineStringWidth: 3,
						lineStringColor: "rgba(155, 255, 155, 0.5)",

						// zIndex: number;
					},
				}),

				// Great Circle
				// new TerraDrawGreatCircleMode({
				// 	// The radius of the point
				// 	radius: 20,
				// }),

				// // Freehand
				// new TerraDrawFreehandMode({
				// 	// The radius of the point
				// 	radius: 20,
				// }),

				// // Circle
				// new TerraDrawCircleMode({
				// 	// The radius of the point
				// 	radius: 20,
				// }),

				// // Rectangle
				// new TerraDrawRectangleMode({
				// 	// The radius of the point
				// 	radius: 20,
				// }),
			],
		});

		// Start drawing
		draw.value.start();

		// Set the mode to polygon
		draw.value.setMode("select");

		state.value.status = "init";
	});

	return {
		draw,
		state,
	};
}
