<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePaintingStore } from '@/stores/usePaintingStore'

import rowerGrid from '@/data/json/rowerGrid.json'
import seineGrid from '@/data/json/seineGrid.json'
import GridComponent from '@/components/GridComponent.vue'
import GuidePopup from '@/components/GuidePopup.vue'
import DebugGrid from '@/components/DebugGrid.vue'

const route = useRoute()
const store = usePaintingStore()

const grids: Record<string, any> = {
  rowers: rowerGrid,
  seine: seineGrid,
}

const grid = grids[route.params.id as string]
store.load(grid)
</script>

<template>
  <GuidePopup />
  <RouterLink id="back-button" class="btn" :to="`/${route.params.id}Home`">Terug naar homepagina</RouterLink>
  <GridComponent :grid="grid" />
<!--  <DebugGrid :grid="grid" />-->
</template>
