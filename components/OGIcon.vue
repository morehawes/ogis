<script setup>
import { require } from "require";

defineProps({
	name: {
		type: String,
		required: true,
	},
	size: {
		type: String,
		default: "24",
	},
	color: {
		type: String,
		default: "black",
	},
});

const iconNames = ref(["accessibility"]);

const iconName = computed(() => {
	if (iconNames.value.includes(name)) {
		return name;
	} else {
		return "accessibility";
	}
});
</script>

<template>
	<div class="og-icon">
		<div
			v-html="require(`../node_modules/ionicons/dist/svg/${name}.svg?raw`)"
		/>
	</div>
</template>

<style>
.og-icon {
	background-color: red;

	display: inline-block;

	img {
		vertical-align: middle;
	}
}
</style>
