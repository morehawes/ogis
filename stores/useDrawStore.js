export const useDrawStore = defineStore("DrawStore", () => {
	const draw = useDraw();

	//If status is null
	if (!draw.state.get("status")) {
		draw.init();
	}

	return {
		draw,
	};
});
