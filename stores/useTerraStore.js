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

	const lng = ref(-1.826252);
	const lat = ref(51.179026);
	const zoom = ref(16);

	const activeMode = ref("select");

	function changeMode(mode) {
		activeMode.value = mode;
	}

	return { lat, lng, zoom, modes, activeMode, changeMode };
});
