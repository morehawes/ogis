export const useTerraStore = defineStore("terra", () => {
	const lng = ref(-1.826252);
	const lat = ref(51.179026);
	const zoom = ref(16);

	const activeMode = ref("select");

	function getModes() {
		return [
			new TerraDrawFreehandMode(),
			new TerraDrawLineStringMode(),
			new TerraDrawCircleMode(),
			new TerraDrawGreatCircleMode(),
			new TerraDrawPointMode(),
			new TerraDrawPolygonMode(),
			new TerraDrawRectangleMode(),
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
			// new TerraDrawRenderMode({
			// 	modeName: "render",
			// }),
		];
	}

	function changeMode(mode) {
		activeMode.value = mode;
	}

	return { lat, lng, zoom, getModes, activeMode, changeMode };
});
