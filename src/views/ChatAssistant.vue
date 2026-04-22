<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Personality prompt inladen (per schilderij)
const props = defineProps<{ personality: string; isOpen: boolean }>()
const emit = defineEmits(['close'])
const loadingPrompt = ref(true)
const systemPrompt = ref('')
const input = ref('')
const chatHistory = ref<{ role: 'user' | 'assistant'; content: string }[]>([])

// Gemini client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)
// model could change because of deprication or because model is overloaded
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

function buildPrompt(userMessage: string) {
  console.log(systemPrompt.value)
  return `
### INSTRUCTIES (PERSONALITY)
${systemPrompt.value}

---

### GESPREK TOT NU TOE
${chatHistory.value
  .map((m) => `${m.role === 'user' ? 'Gebruiker' : 'Assistent'}: ${m.content}`)
  .join('\n')}

---

### NIEUWE VRAAG
Gebruiker: ${userMessage}

Assistent:
`
}

async function askGemini(userMessage: string) {
  const prompt = buildPrompt(userMessage)

  const result = await model.generateContent(prompt)
  return result.response.text()
}

async function sendMessage() {
  if (loadingPrompt.value) return
  if (!input.value.trim()) return

  const userMsg = input.value
  chatHistory.value.push({ role: 'user', content: userMsg })
  input.value = ''

  try {
    const reply = await askGemini(userMsg)
    chatHistory.value.push({ role: 'assistant', content: reply })
  } catch (err) {
    console.error(err)
    chatHistory.value.push({
      role: 'assistant',
      content: 'Er ging iets mis met de AI. Probeer het later opnieuw.',
    })
  }
}

function closePopup() {
  emit('close')
}

onMounted(async () => {
  console.log(props.personality)
  const file = `assets/ai/${props.personality}.txt`
  console.log('🔍 Personality file path:', file)
  try {
    const res = await fetch(file)
    console.log('[DEBUG] Fetch status:', res.status)

    // const text = await res.text()
    // console.log('[DEBUG] Loaded file content:', text)
  } catch {
    systemPrompt.value = await fetch(file).then((r) => r.text())
  }

  loadingPrompt.value = false
})
</script>

<template>
  <!-- Donkere achtergrond -->
  <div v-if="props.isOpen" class="overlay" @click="closePopup"></div>

  <!-- Popup venster -->
  <div v-if="props.isOpen" class="popup">
    <div class="chat-container">
      <div class="messages">
        <div v-for="(msg, i) in chatHistory" :key="i" :class="['msg', msg.role]">
          {{ msg.content }}
        </div>
      </div>

      <div class="input-row">
        <input
          v-model="input"
          @keyup.enter="sendMessage"
          placeholder="Stel een vraag over het schilderij..."
        />
        <button @click="sendMessage">Verstuur</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
  max-height: 60vh;
  overflow-y: auto;
}

.msg {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  line-height: 1.4;
}

.msg.user {
  background: #d0e6ff;
  align-self: flex-end;
}

.msg.assistant {
  background: #f0f0f0;
  align-self: flex-start;
}

.input-row {
  display: flex;
  gap: 0.5rem;
}

input {
  flex: 1;
  padding: 0.6rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* Donkere achtergrond */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
  z-index: 900;
}

/* Popup venster */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 12px;
  padding: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

/* Chat container blijft zoals je had */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
