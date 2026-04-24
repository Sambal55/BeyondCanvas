<script setup>
import { storeToRefs } from 'pinia'
import { useGuideStore } from '@/stores/useGuideStore'
import { ref, onMounted, onUnmounted } from 'vue'

const store = useGuideStore()
const { isVisible } = storeToRefs(store)

const popupRef = ref(null)

function closePopup() {
  store.closeGuide()
}

function handleClickOutside(e) {
  if (popupRef.value && !popupRef.value.contains(e.target)) {
    closePopup()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div v-if="isVisible" class="guide-popup" ref="popupRef">
    <div class="header-row">
      <h2>Handleiding</h2>
      <a class="btn close-btn" @click="closePopup">Sluiten</a>
    </div>

    <div class="content">
      <p>
        <!--        Insert Guide text etc-->
      </p>
    </div>
  </div>
</template>

<style scoped>
.guide-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: black;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px black;
  max-width: 80%;
  z-index: 95;
  color: yellow;
  animation: fadeIn 0.2s ease-out;
}

/* header: button links, titel rechts */
.header-row {
  display: flex;
  align-items: center; /* verticaal centreren */
  justify-content: space-between; /* button links, titel rechts */
  gap: 12px;
}

.close-btn {
  all: unset;
  font-family: inherit;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 6px 12px;
  color: blue;
  background: yellow;
  border-radius: 8px;
}

.close-btn:hover {
  background: blue;
  color: yellow;
}

.content {
  margin-top: 1rem;
  max-height: 50vh;
  overflow-y: auto;
}
</style>
