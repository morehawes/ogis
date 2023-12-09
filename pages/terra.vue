<script setup>
const state = reactive(
	new Map([
		["activeMaps", new Set(["leaflet", "maplibre", "openlayers", "google"])],
	]),
);

const toggleMap = (map) => {
	if (state.get("activeMaps").has(map)) {
		state.get("activeMaps").delete(map);
	} else {
		state.get("activeMaps").add(map);
	}
};

const isActive = (map) => {
	return state.get("activeMaps").has(map);
};
</script>

<template>
	<!-- START Page -->
	<div class="page">
		<!-- START Nav -->
		<div class="nav">
			<div class="nav-item map-toggle">
				<!-- Leaflet -->
				<div
					class="toggle-leaflet"
					:class="{ active: isActive('leaflet') }"
					@click="toggleMap('leaflet')"
				>
					Leaflet
				</div>

				<!-- MapLibre -->
				<div
					class="toggle-maplibre"
					:class="{ active: isActive('maplibre') }"
					@click="toggleMap('maplibre')"
				>
					MapLibre
				</div>

				<!-- OpenLayers -->
				<div
					class="toggle-openlayers"
					:class="{ active: isActive('openlayers') }"
					@click="toggleMap('openlayers')"
				>
					OpenLayers
				</div>

				<!-- Google Maps -->
				<div
					class="toggle-google"
					:class="{ active: isActive('google') }"
					@click="toggleMap('google')"
				>
					Google Maps
				</div>
			</div>
		</div>
		<!-- END Nav -->

		<!-- START Maps -->
		<div class="maps">
			<terra-leaflet v-if="isActive('leaflet')" />

			<terra-maplibre v-if="isActive('maplibre')" />

			<terra-openlayers v-if="isActive('openlayers')" />

			<terra-google v-if="isActive('google')" />

			<terra-mapbox v-if="isActive('mapbox')" />

			<!-- <terra-arcgis /> -->
		</div>
		<!-- END Maps  -->
	</div>
	<!-- END Page -->
</template>

<style lang="less">
.page {
	.nav {
		padding: 5px;
		background-color: #333;
		.nav-item {
			&.map-toggle {
				display: flex;
				justify-content: center;
				align-items: center;

				div {
					margin-right: 5px;
					padding: 10px;
					border-radius: 5px;
					border: 1px solid #fff;
					color: #999;
					cursor: pointer;

					&.active {
						background-color: #fff;
						color: #333;
					}
				}
			}
		}
	}

	.maps {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100vh;
		.map {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
