export const useMapStore = defineStore("MapStore", () => {
	const { map } = useMap({
		mapEleID: "map",
	});

	const state = ref({
		status: null,
	});

	const init = () => {
		state.value.status = "init";

		setTimeout(() => {
			state.value.status = "tick";
		}, 1000);
	};

	return {
		map,
		init,
		state,
	};
});
