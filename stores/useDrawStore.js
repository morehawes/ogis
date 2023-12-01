const { map } = useMap();
const { draw, init: drawInit } = useDraw();

export const useDrawStore = defineStore("DrawStore", () => {
	const state = reactive(new Map([["status", null]]));

	const init = () => {
		drawInit({
			map: map,
		});

		state.set("status", "init");
	};

	return {
		draw,
		init,
		state,
	};
});
