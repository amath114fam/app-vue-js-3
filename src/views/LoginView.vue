<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'
const router = useRouter()  
const authStore = useAuthStore()
const mode = ref('connexion')
const email = ref('')
const password = ref('')

const loading = ref(false)
const erreur = ref('')

async function soumettre() {
  loading.value = true
  erreur.value = ''  // ← reset l'erreur

  if (mode.value === 'connexion') {
    erreur.value = await authStore.connexion(email.value, password.value)
  } else {
    erreur.value = await authStore.inscription(email.value, password.value)
  }

  loading.value = false

  if (authStore.user) {
    router.push('/')
  }
}
</script>


<template>
  <div class="auth-page">
    <div class="auth-card">

      <div class="auth-header">
        <h1 class="auth-logo">💡 Sunnu Idéé</h1>
        <p class="auth-subtitle">Garde tes idées, change le monde</p>
      </div>

      <div class="auth-tabs">
        <button :class="['tab', { actif: mode === 'connexion' }]" @click="mode = 'connexion'">
          Connexion
        </button>
        <button :class="['tab', { actif: mode === 'inscription' }]" @click="mode = 'inscription'">
          Inscription
        </button>
      </div>

      <div class="auth-form">
        <div class="champ">
          <label>Email</label>
          <input type="email" v-model="email" placeholder="ton@email.com" />
        </div>

        <div class="champ">
          <label>Mot de passe</label>
          <input type="password" v-model="password" placeholder="••••••••" />
        </div>

        <span v-if="erreur" style="color: #f09595; font-size: 13px; text-align: center;">
          {{ erreur }}
        </span>

        <button class="btn-submit" @click="soumettre" :disabled="loading">
        {{ loading ? 'Chargement...' : mode === 'connexion' ? 'Se connecter' : "S'inscrire" }}
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f0f1a;
}

.auth-card {
  background: #16213e;
  border-radius: 20px;
  border: 0.5px solid rgba(29, 158, 117, 0.3);
  padding: 2.5rem;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.auth-header {
  text-align: center;
}

.auth-logo {
  font-size: 28px;
  font-weight: 700;
  color: #e8e8f0;
  margin: 0 0 8px;
}

.auth-subtitle {
  font-size: 14px;
  color: #8888aa;
  margin: 0;
}

.auth-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
}

.tab {
  flex: 1;
  padding: 9px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #8888aa;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.tab.actif {
  background: rgba(29, 158, 117, 0.15);
  color: #5dcaa5;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  font-weight: 500;
  color: #8888aa;
}

input {
  padding: 12px 14px;
  border: 0.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  color: #e8e8f0;
  font-size: 15px;
  outline: none;
  transition: 0.2s;
}

input:focus {
  border-color: rgba(29, 158, 117, 0.6);
  box-shadow: 0 0 0 3px rgba(29, 158, 117, 0.1);
}

input::placeholder {
  color: #555570;
}

.btn-submit {
  padding: 12px;
  background: #1d9e75;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 4px;
}

.btn-submit:hover {
  background: #17825f;
  transform: translateY(-1px);
}
</style>