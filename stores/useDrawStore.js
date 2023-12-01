export const useDrawStore = defineStore("DrawStore", () => {
	const { map } = useMap();
	const { draw, init: drawInit } = useDraw();

	const state = ref({
		status: null,
	});

	const init = () => {
		drawInit({
			map: map.value,
		});

		state.value.status = "init";
	};

	return {
		draw,
		init,
		state,
	};
});
