<!--HomeView
Where you come only if you remove URL part of Seine or Rowers-->

<script setup lang="ts">
import { usePaintingStore } from '@/stores/usePaintingStore'
import {useSfxStore} from '@/stores/useSfxStore'
import {useAmbienceStore} from '@/stores/useAmbienceStore'
// no grid, because no painting
usePaintingStore().load(null)

useAmbienceStore().stop()
useSfxStore().stopAll()
</script>

<template>
  <RouterLink to="/seine">La Grenouillèrey</RouterLink>
  <br />
  <RouterLink to="/rowers">Luncheon of the Boating Party</RouterLink>
</template>

<style>

</style>
