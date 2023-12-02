export const useDrawStore = defineStore("DrawStore", () => {
	const { draw } = useDraw();

	const state = ref({
		status: null,
	});

	const init = () => {
		state.value.status = "init";

		const mapData = {
			type: "FeatureCollection",
			features: [
				{
					geometry: { type: "Point", coordinates: [-124.997637, 49.688066] },
					type: "Feature",
					properties: { type: "food" },
				},
				{
					geometry: { type: "Point", coordinates: [-124.99021, 49.692078] },
					type: "Feature",
					properties: { type: "food" },
				},
				{
					geometry: { type: "Point", coordinates: [-124.999459, 49.688188] },
					type: "Feature",
					properties: { type: "food" },
				},
				{
					geometry: { type: "Point", coordinates: [-124.937031, 49.678181] },
					type: "Feature",
					properties: { type: "beer" },
				},
				{
					geometry: { type: "Point", coordinates: [-124.958499, 49.641845] },
					type: "Feature",
					properties: { type: "beer" },
				},
				{
					geometry: { type: "Point", coordinates: [-125.018245, 49.687511] },
					type: "Feature",
					properties: { type: "beer" },
				},
				{
					geometry: { type: "Point", coordinates: [-125.061836, 49.688955] },
					type: "Feature",
					properties: { type: "trailaccess" },
				},
				{
					geometry: { type: "Point", coordinates: [-124.991103, 49.619385] },
					type: "Feature",
					properties: { type: "trailaccess" },
				},
				{
					geometry: { type: "Point", coordinates: [-124.977041, 49.744894] },
					type: "Feature",
					properties: { type: "trailaccess" },
				},
			],
		};

		// Iterate over each point and add to map
		mapData.features.forEach((marker) => {
			marker.properties.mode = "point";
		});

		draw.value.addFeatures(mapData.features);

		setTimeout(() => {
			state.value.status = "tick";
		}, 1000);
	};

	return {
		draw,
		init,
		state,
	};
});
