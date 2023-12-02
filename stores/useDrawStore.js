export const useDrawStore = defineStore("DrawStore", () => {
	const { draw } = useDraw();

	const state = ref({
		status: null,
	});

	const init = async () => {
		state.value.status = "init";

		await fetch("/data/route-map.geojson")
			.then((res) => res.json())
			.then((data) => {
				//Iterate over each feature
				data.features.forEach((feature) => {
					// Add Terra Draw Modes
					switch (feature.geometry.type) {
						//Point
						case "Point":
							feature.properties.mode = "point";
							break;
						//LineString
						case "LineString":
							feature.properties.mode = "linestring";
							break;
						//Polygon
						case "Polygon":
							feature.properties.mode = "polygon";
							break;
					}
				});

				draw.value.addFeatures(data.features);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return {
		draw,
		init,
		state,
	};
});
