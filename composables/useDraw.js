export function useDraw(useConfig = {}) {
	const config = reactive(new Map());
	const state = reactive(new Map([["status", null]]));

	// Merge useConfig into config
	config.forEach((value, key) => {
		// Iff allowable key
		if (useConfig[key]) {
			config.set(key, useConfig[key]);
		}
	});

	const draw = reactive({ joe: "test" });

	const init = () => {
		alert("Innit!");

		state.set("status", "init");
	};

	return {
		draw,
		state,
		init,
	};
}
