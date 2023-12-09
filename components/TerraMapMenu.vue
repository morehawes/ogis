<script setup>
const terraStore = useTerraStore();

const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	features: {
		type: Array,
		default: [],
	},
	activeMode: {
		type: String,
		default: "select",
	},
});

defineEmits(["update:activeMode"]);

onMounted(() => {
	console.log("TerraMapMenu.vue: onMounted()");
});
</script>

<template>
	<div class="map-menu">
		<div class="title">{{ title }}</div>
		<textarea v-show="features.length" class="features" readonly>{{
			JSON.stringify(features)
		}}</textarea>
	</div>
</template>

<style lang="less">
.map-menu {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	padding: 10px;
	z-index: 1000;
	background-color: rgba(0, 0, 0, 0.5);

	.title {
		font-size: 24px;
		font-weight: bold;
		color: #fff;
		margin-bottom: 10px;
	}

	.modes {
		.item {
			position: relative;
			display: block;
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			font-size: 18px;
			font-weight: bold;
			color: #fff;
			transition: all 0.2s ease-in-out;
			cursor: pointer;

			&:hover {
				background-color: rgba(0, 0, 0, 0.75);
			}
		}
	}
}
</style>
