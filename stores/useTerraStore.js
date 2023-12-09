export const useTerraStore = defineStore("terra", () => {
	// Terra Draw modes
	const modes = [
		new TerraDrawFreehandMode(),
		new TerraDrawLineStringMode(),
		new TerraDrawCircleMode(),
		new TerraDrawGreatCircleMode(),
		new TerraDrawPointMode(),
		new TerraDrawPolygonMode(),
		new TerraDrawRectangleMode(),
		new TerraDrawSelectMode(),
		// new TerraDrawRenderMode({
		// 	modeName: "render",
		// }),
	];

	const activeMode = ref("select");

	function changeMode(mode) {
		activeMode.value = mode;
	}

	return { modes, activeMode, changeMode };
});
