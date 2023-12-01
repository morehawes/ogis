export const useDrawStore = defineStore("DrawStore", () => {
	const { draw } = useDraw();

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
		draw,
		init,
		state,
	};
});
