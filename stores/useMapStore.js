export const useMapStore = defineStore("MapStore", () => {
	const { map, init: mapInit } = useMap();

	const config = ref({
		mapEleID: "map",
	});

	const state = ref({
		status: null,
	});

	const init = () => {
		mapInit({
			mapEleID: config.value.mapEleID,
		});

		state.value.status = "init";
	};

	return {
		map,
		init,
		state,
	};
});
