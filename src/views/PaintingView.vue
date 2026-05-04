<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePaintingStore } from '@/stores/usePaintingStore'

import rowerGrid from '@/data/json/rowerGrid.json'
import seineGrid from '@/data/json/seineGrid.json'
import GridComponent from '@/components/GridComponent.vue'
import GuidePopup from '@/components/GuidePopup.vue'
import { onUnmounted } from 'vue'
import { useAmbienceStore } from '@/stores/useAmbienceStore'
import { useSfxStore } from '@/stores/useSfxStore'

const route = useRoute()
const store = usePaintingStore()

const grids: Record<string, any> = {
  rowers: rowerGrid,
  seine: seineGrid,
}

const grid = grids[route.params.id as string]
store.load(grid)

onUnmounted(() => {
  useAmbienceStore().stop()
  useSfxStore().stopAll()
})
</script>

<template>
  <GuidePopup />
  <RouterLink id="back-button" class="btn" :to="`/${route.params.id}Home`"
    >Terug naar hoofdmenu</RouterLink
  >
  <GridComponent :grid="grid" />
</template>
