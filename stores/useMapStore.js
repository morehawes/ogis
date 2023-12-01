const { map, init: mapInit } = useMap();

export const useMapStore = defineStore("MapStore", () => {
	const config = reactive(new Map([["mapEleID", "map"]]));
	const state = reactive(new Map([["status", null]]));

	const init = () => {
		mapInit({
			mapEleID: config.get("mapEleID"),
		});

		state.set("status", "init");
	};

	return {
		map,
		init,
		state,
	};
});
