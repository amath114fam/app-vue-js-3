<script setup>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useIdeeStore } from '../stores/ideeStore.js'

const ideeStore = useIdeeStore()

const router = useRouter()

const ideeASupprimer = ref(null)

const props = defineProps({
  id: Number,
  categorie: String,
  titre: String,
  description: String
})

// Émettre un événement pour supprimer une idée
const emit = defineEmits(['supprimer'])

// function pour rediriger vers la page de modification d'une idée
function modifierIdee() {
  router.push(`/update-idee/${props.id}`)
}

// function pour ouvrir la modal de confirmation de suppression
const showModal = ref(false)
function ouvrirModal() {
  ideeASupprimer.value = props
  showModal.value = true
}

// function pour confirmer la suppression d'une idée
function confirmerSuppression() {
  emit('supprimer', ideeASupprimer.value.id)
  ideeASupprimer.value = null
  showModal.value = false
  router.push('/')
}

// function pour rediriger vers la page de détail d'une idée
function lireIdee() {
  router.push(`/detail-idee/${props.id}`)
}
</script>

<template>
  <div class="card">
    <div class="card-accent"></div>

    <div class="card-body">
      <div class="card-category">
        <i class="ti ti-code"></i>
        {{ props.categorie }}
      </div>

      <h2 class="card-title">{{ props.titre }}</h2>
      <p class="card-description">{{ props.description }}</p>

      <div class="card-footer">
        <button class="card-action" @click="lireIdee">
          Lire →
        </button>
      </div>
    </div>

    <div class="card-buttons">
      <button class="btn btn-edit" @click="modifierIdee">
        <i class="ti ti-edit"></i>
        Modifier
      </button>

      <button class="btn btn-delete" @click="ouvrirModal">
        <i class="ti ti-trash"></i>
        Supprimer
      </button>
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
    <div class="modal">

      <div class="modal-header">
        <div class="modal-icon">
          <i class="ti ti-trash"></i>
        </div>
        <p class="modal-title">Supprimer l'idée</p>
        <button class="modal-close">
          <i class="ti ti-x"></i>
        </button>
      </div>

      <div class="modal-body">
        <p>Tu es sur le point de supprimer <strong>{{ ideeASupprimer?.titre }}</strong>. Cette action est irréversible.</p>
      </div>

      <div class="modal-footer">
        <button class="btn-annuler" @click="showModal = false">Annuler</button>
        <button class="btn-confirmer" @click="confirmerSuppression">
          <i class="ti ti-trash"></i>
          Supprimer
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.card {
  background: #16213e;
  border-radius: 16px;
  border: 0.5px solid rgba(29, 158, 117, 0.3);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  border-color: rgba(29, 158, 117, 0.7);
}

.card-accent {
  height: 3px;
  background: linear-gradient(90deg, #1d9e75, #5dcaa5);
}

.card-body {
  padding: 1.25rem 1.5rem 1.5rem;
}

.card-category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(29, 158, 117, 0.12);
  color: #5dcaa5;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.card-title {
  font-size: 18px;
  color: #e8e8f0;
  margin-bottom: 10px;
}

.card-description {
  color: #8888aa;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1rem;
  margin-top: 1rem;
}

.card-meta {
  color: #555570;
  font-size: 12px;
}

.card-action {
  background: rgba(29, 158, 117, 0.1);
  color: #5dcaa5;
  border: 1px solid rgba(29, 158, 117, 0.4);
  border-radius: 20px;
  padding: 5px 14px;
  cursor: pointer;
}

.card-buttons {
  display: flex;
  gap: 8px;
  padding: 0 1.5rem 1.25rem;
}

.btn {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-edit {
  background: rgba(55, 138, 221, 0.08);
  color: #85b7eb;
  border: 1px solid rgba(55, 138, 221, 0.35);
}

.btn-delete {
  background: rgba(226, 75, 74, 0.08);
  color: #f09595;
  border: 1px solid rgba(226, 75, 74, 0.35);
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  width: 380px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(226, 75, 74, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e24b4a;
  font-size: 18px;
}

.modal-title {
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #888;
  display: flex;
}

.modal-body {
  border-top: 0.5px solid rgba(255,255,255,0.1);
  padding-top: 16px;
  font-size: 14px;
  color: #0e0d0d;
  line-height: 1.6;
}

.modal-body strong {
  color: #d51414;
}

.modal-footer {
  display: flex;
  gap: 10px;
}

.btn-annuler {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: 0.5px solid rgba(255,255,255,0.15);
  background: rgba(226, 75, 74, 0.15);
  color: #525284;
  font-size: 14px;
  cursor: pointer;
}

.btn-confirmer {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: rgba(226, 75, 74, 0.15);
  color: #c10303;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
</style>