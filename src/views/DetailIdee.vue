<script setup>
import { useRoute } from 'vue-router'
import { useIdeeStore } from '../stores/ideeStore.js'
const ideeStore = useIdeeStore()

const route = useRoute()
const idee = ideeStore.idees.find(i => i.id === Number(route.params.id))

const dateAjout = new Date(idee.id).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})
</script>


<template>
  <div class="detail-page">

    <RouterLink to="/" class="btn-retour">
      <i class="ti ti-arrow-left"></i>
      Retour
    </RouterLink>

    <div class="detail-card">

      <div class="detail-accent"></div>

      <div class="detail-header">
        <div class="detail-category">
          <i class="ti ti-code"></i>
            {{ idee?.categorie }}
        </div>
      </div>

      <h1 class="detail-titre">{{ idee?.titre }}</h1>

      <p class="detail-description">
        {{ idee?.description }}
      </p>

      <div class="detail-footer">
        <div class="detail-meta">
          <i class="ti ti-clock"></i>
          {{ dateAjout }}
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.detail-page {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.btn-retour {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #5dcaa5;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s;
  width: fit-content;
}

.btn-retour:hover {
  gap: 12px;
}

.detail-card {
  background: #16213e;
  border-radius: 20px;
  border: 0.5px solid rgba(29, 158, 117, 0.3);
  overflow: hidden;
}

.detail-accent {
  height: 4px;
  background: linear-gradient(90deg, #1d9e75, #5dcaa5);
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem 0;
}

.detail-category {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(29, 158, 117, 0.12);
  color: #5dcaa5;
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  border: 0.5px solid rgba(93, 202, 165, 0.3);
}

.detail-actions {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  padding: 7px 14px;
  border-radius: 8px;
  border: 0.5px solid;
  cursor: pointer;
  transition: 0.15s;
}

.btn-edit {
  background: rgba(55, 138, 221, 0.08);
  border-color: rgba(55, 138, 221, 0.35);
  color: #85b7eb;
}

.btn-edit:hover {
  background: rgba(55, 138, 221, 0.18);
}

.btn-delete {
  background: rgba(226, 75, 74, 0.08);
  border-color: rgba(226, 75, 74, 0.35);
  color: #f09595;
}

.btn-delete:hover {
  background: rgba(226, 75, 74, 0.18);
}

.detail-titre {
  font-size: 26px;
  font-weight: 600;
  color: #e8e8f0;
  padding: 1.25rem 1.5rem 0;
  margin: 0;
  line-height: 1.3;
}

.detail-description {
  font-size: 15px;
  color: #8888aa;
  line-height: 1.8;
  padding: 1rem 1.5rem 0;
  margin: 0;
}

.detail-footer {
  padding: 1.5rem;
  border-top: 0.5px solid rgba(255, 255, 255, 0.06);
  margin-top: 1.5rem;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #555570;
}
</style>