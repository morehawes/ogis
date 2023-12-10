export const useTerraStore = defineStore("terra", () => {
	const lng = ref(-1.826252);
	const lat = ref(51.179026);
	const zoom = ref(16);

	const activeMode = ref("select");

	function getModes() {
		return [
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
	}

	function changeMode(mode) {
		activeMode.value = mode;
	}

	return { lat, lng, zoom, getModes, activeMode, changeMode };
});
