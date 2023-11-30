<script setup>
const props = 	defineProps({
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

const iconNames = ref(["polygon"]);

const iconName = computed(() => {
	if (iconNames.value.indexOf(props.name) > -1) {
		return props.name;
	} else {
		return false;
	}
});
</script>

<template>
	<div class="og-icon">
		{{ iconName }}

		<img
			v-show="iconName"
			:src="`/img/icon/${iconName}.svg`"
			:alt="iconName"
			:width="size"
			:height="size"
		/>
	</div>
</template>

<style lang="less">
.og-icon {
	background-color: red;

	display: inline-block;

	img {
		vertical-align: middle;
	}
}
</style>
