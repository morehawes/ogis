export function useTerraDraw(adapter) {
	const { getModes } = useTerraStore();
	const { activeMode } = storeToRefs(useTerraStore());

	const state = ref({ status: null, features: null });

	// Initialise Terra Draw
	const draw = new TerraDraw({
		adapter,
		modes: getModes(),
	});

	// Start drawing
	draw.start();

	// Watch for changes
	watch(activeMode, () => {
		draw.setMode(activeMode.value);
	});

	// Events
	draw.on("change", (ids, type) => {
		//Done editing
		if (type === "delete") {
			// Get the Store snapshot
			state.value.features = draw.getSnapshot();
		}
	});

	draw.setMode(activeMode.value);

	state.value.status = "init";
	// });

	return {
		draw,
		state,
	};
}
