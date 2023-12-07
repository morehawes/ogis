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
	TerraDrawRenderMode,
} from "terra-draw";

export function useDraw() {
	const draw = ref(null);

	const { map } = storeToRefs(useMapStore());

	const state = ref({ status: null });

	// Initialise Terra Draw
	onMounted(() => {
		console.debug("useDraw onMounted");

		// Create the adapter
		const libreDrawAdapter = new TerraDrawMapLibreGLAdapter({
			map: map.value,
		});

		// Initialize Terra Draw
		draw.value = new TerraDraw({
			adapter: libreDrawAdapter,

			// Modes
			modes: [
				//Select
				new TerraDrawSelectMode({
					// dragEventThrottle?: number;
					// keyEvents?: null | TerraDrawSelectModeKeyEvents;
					// pointerDistance?: number;

					// Mode features
					flags: {
						// Point
						point: {
							feature: {
								draggable: true,
							},
						},

						// Polygon
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

						// Line
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

						// Freehand
						freehand: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},

						// Circle
						circle: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},

						// Rectangle
						rectangle: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},

						// Great Circle
						greatcircle: {
							feature: {
								draggable: true,
								coordinates: {
									midpoints: true,
									draggable: true,
									deletable: true,
								},
							},
						},
					},
					styles: {
						// Point
						selectedPointColor: "#222222", // Hex color
						selectedPointWidth: 2, // Integer
						selectedPointOutlineColor: "#222222", // Hex color
						selectedPointOutlineWidth: 2, // Integer

						// LineString
						selectedLineStringColor: "#222222", // Hex color
						selectedLineStringWidth: 2, // Integer

						// Polygon
						selectedPolygonColor: "#00FF00", // Hex color
						selectedPolygonFillOpacity: 0.7, // 0 - 1
						selectedPolygonOutlineColor: "#222222", // Hex color
						selectedPolygonOutlineWidth: 2, // Integer

						// Selection Points
						// (of a polygon/linestring feature)
						selectionPointWidth: 2, // Integer
						selectionPointColor: "green", // Hex color
						selectionPointOutlineColor: "pink", // Hex color
						selectionPointOutlineWidth: 2, // Integer

						// Mid Points
						//(of a polygon/linestring feature)
						midPointColor: "red", // Hex color
						midPointOutlineColor: "blue", // Hex color
						midPointWidth: 1, // Integer
						midPointOutlineWidth: 1, // Integer
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
						outlineWidth: 2,
					},
				}),

				// Point
				new TerraDrawPointMode({
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

				// TerraDrawRenderMode

				// pointColor: HexColorStyling;
				// pointWidth: NumericStyling;
				// pointOutlineColor: HexColorStyling;
				// pointOutlineWidth: NumericStyling;
				// polygonFillColor: HexColorStyling;
				// polygonFillOpacity: NumericStyling;
				// polygonOutlineColor: HexColorStyling;
				// polygonOutlineWidth: NumericStyling;
				// lineStringWidth: NumericStyling;
				// lineStringColor: HexColorStyling;
				// zIndex: NumericStyling;

				new TerraDrawRenderMode({
					modeName: "joetest",
					styles: {
						// Point
						pointColor: "rgba(0, 0, 0, 0.5)",
						pointWidth: 5,
						pointOutlineColor: "red",
						pointOutlineWidth: 2,

						// Polygon
						polygonFillColor: "blue",
						polygonFillOpacity: 0.8,
						polygonOutlineColor: "red",
						polygonOutlineWidth: 1,

						// Line String
						lineStringWidth: 3,
						lineStringColor: "rgba(155, 255, 155, 0.5)",
					},
				}),

				new TerraDrawRenderMode({
					modeName: "joetest2",
					styles: {
						// Point
						pointColor: "brown",
						pointWidth: 1,
						pointOutlineColor: "green",
						pointOutlineWidth: 3,

						// Polygon
						polygonFillColor: "yellow",
						polygonFillOpacity: 0.5,
						polygonOutlineColor: "purple",
						polygonOutlineWidth: 3,

						// Line String
						lineStringWidth: 5,
						lineStringColor: "pink",
					},
				}),

				// Great Circle
				new TerraDrawGreatCircleMode({
					styles: {
						lineStringWidth: 2,
						lineStringColor: "red",
						closingPointColor: "black",
						closingPointWidth: 1,
						closingPointOutlineColor: "green",
						closingPointOutlineWidth: 10,
					},
				}),

				// Freehand
				new TerraDrawFreehandMode({
					styles: {
						fillColor: "green",
						fillOpacity: 0.8,
						outlineColor: "red",
						outlineWidth: 5,
						closingPointColor: "pink",
						closingPointWidth: 1,
						closingPointOutlineColor: "purple",
						closingPointOutlineWidth: 5,
					},
				}),

				// Circle
				new TerraDrawCircleMode({
					styles: {
						fillColor: "white",
						outlineColor: "black",
						outlineWidth: 1,
						fillOpacity: 0.34,
					},
				}),

				/*

	fillColor: HexColorStyling;
	outlineColor: HexColorStyling;
	outlineWidth: NumericStyling;
	fillOpacity: NumericStyling;

*/

				// Rectangle
				new TerraDrawRectangleMode({
					styles: {
						fillColor: "purple",
						outlineColor: "red",
						outlineWidth: 2,
						fillOpacity: 0.9,
					},
				}),
			],
		});

		const point = {
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [-127.987677916, 50.778150623],
			},
			properties: {
				mode: "joetest2",
			},
		};

		const points = [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [-127.987677916, 50.778150623],
				},
				properties: {
					mode: "joetest",
				},
			},
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [-127.940986021, 50.792042414],
				},
				properties: {
					mode: "joetest",
				},
			},
		];

		const polygon = {
			type: "Feature",
			geometry: {
				type: "Polygon",
				coordinates: [
					[
						[-127.925337573, 50.782501827],
						[-127.958296557, 50.76382997],
						[-127.933577319, 50.769475736],
						[-127.898558398, 50.770344255],
						[-127.925337573, 50.782501827],
					],
				],
			},
			properties: {
				mode: "joetest",
			},
		};

		const line = {
			id: "1a725af8-869a-47d7-a933-13da3a4b3780",
			type: "Feature",
			geometry: {
				type: "LineString",
				coordinates: [
					[-127.981263532, 50.729068668],
					[-127.934571638, 50.743844046],
					[-127.902299299, 50.721244522],
					[-127.865220441, 50.74666822],
					[-127.840844526, 50.729937937],
				],
			},
			properties: {
				mode: "joetest2",
			},
		};

		// Start drawing
		draw.value.start();

		// Add the Point
		draw.value.addFeatures([point]);

		// // Add the points
		// draw.value.addFeatures(points);

		// Add the polygon
		// draw.value.addFeatures([polygon]);

		// Add the line
		// draw.value.addFeatures([line]);

		// Set the mode to polygon
		// draw.value.setMode("select");

		state.value.status = "init";
	});

	return {
		draw,
		state,
	};
}
