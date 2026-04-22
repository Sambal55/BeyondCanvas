<script setup lang="ts">
import { useRoute } from 'vue-router'
import DebugGrid from '@/components/DebugGrid.vue'
import { usePaintingStore } from '@/stores/usePaintingStore'

import rowerGrid from '@/data/json/rowerGrid.json'
import seineGrid from '@/data/json/seineGrid.json'

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
  <RouterLink class="btn" :to="`/${route.params.id}Home`">Terug naar homepagina</RouterLink>
  <DebugGrid :grid="grid" />
</template>
