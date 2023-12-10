export function useTerraDraw(map = null, lib = null) {
	const draw = ref(null);
	const state = ref({ status: null });

	// Initialise Terra Draw
	onMounted(() => {
		console.debug("useTerraDraw onMounted");

		// Create Terra Draw
		const draw = new TerraDraw({
			adapter: new TerraDrawMapLibreGLAdapter({
				lib: MapLibreGL,
				map,
			}),
			modes: getModes(),
		});

		// Events
		draw.on("change", (ids, type) => {
			//Done editing
			if (type === "delete") {
				// Get the Store snapshot
				state.features = draw.getSnapshot();
			}
		});

		// Start drawing
		draw.start();

		// Watch for changes
		watch(activeMode, () => {
			draw.setMode(activeMode.value);
		});

		draw.setMode(activeMode.value);

		// draw.value.setMode("select");

		state.value.status = "init";
	});

	return {
		draw,
		state,
	};
}
