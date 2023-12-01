export const useMapStore = defineStore("MapStore", () => {
	const config = reactive(new Map([["mapEleID", "map"]]));

	const { map, init: mapInit } = useMap();

	const init = () => {
		mapInit({
			mapEleID: config.get("mapEleID"),
		});
	};

	return {
		map,
		init,
	};
});
