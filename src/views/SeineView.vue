<!--SeineView
View which has the painting La Grenouillèrey by Renoir-->
<script setup lang="ts">
import seineGrid from '@/data/json/seineGrid.json'
import DebugGrid from '@/components/DebugGrid.vue'

const grid = seineGrid
</script>

<template>
  <DebugGrid :grid="grid"></DebugGrid>
</template>

<style scoped></style>
