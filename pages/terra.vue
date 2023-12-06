<script setup></script>

<template>
	<!-- START Container -->
	<div class="container">
		<terra-leaflet />

		<terra-maplibre />

		<terra-openlayers />

		<terra-google />

		<terra-mapbox />

		<terra-arcgis />
	</div>
	<!-- END Container -->
	<NuxtPage />
</template>

<style lang="less">
body {
	margin: 0;
	padding: 0;
	font-family: "Roboto", sans-serif;
	font-size: 14px;
	color: #333;
	background-color: #fff;
}

.container {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100vh;
	.map {
		width: 100%;
		height: 100%;
	}
}
</style>
