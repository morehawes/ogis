export const useDrawStore = defineStore("DrawStore", () => {
	const { map } = useMap();
	const { draw, init: drawInit } = useDraw();

	const init = () => {
		watch(map, (newVal, oldVal) => {
			if (newVal && !oldVal) {
				drawInit({
					map,
				});
			}
		});
	};

	return {
		draw,
		init,
	};
});
