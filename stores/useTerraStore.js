export const useTerraStore = defineStore("terra", () => {
	// Terra Draw modes
	const modes = reactive([
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
	]);

	return { modes };
});
