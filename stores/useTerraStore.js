export const useTerraStore = defineStore("terra", () => {
	const lng = ref(-1.826252);
	const lat = ref(51.179026);
	const zoom = ref(16);

	const activeMode = ref("select");

	function changeMode(mode) {
		activeMode.value = mode;
	}

	return { lat, lng, zoom, activeMode, changeMode };
});
