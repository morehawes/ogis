import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				"sea-green": {
					"50": "#f3faf5",
					"100": "#e2f6e8",
					"200": "#c7ebd1",
					"300": "#9adbae",
					"400": "#67c183",
					"500": "#42a560",
					"600": "#30844a",
					"700": "#2a6b3e",
					"800": "#255635",
					"900": "#20472e",
					"950": "#0d2616",
				},
			},
		},
	},
};
