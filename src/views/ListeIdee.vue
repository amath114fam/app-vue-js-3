<template>
<div class="container">
  <div class="page-header">
    <h1>Mes idées</h1>
    <RouterLink to="/ajouter-idee" class="btn-add">
      <i class="ti ti-plus"></i>
      Ajouter une idée
    </RouterLink>
  </div>
</div>

<div class="filtres">
  <button :class="['filtre-btn', { actif: filtreActif === 'Tous' }]" @click="filtreActif = 'Tous'">Tous</button>
  <button :class="['filtre-btn', { actif: filtreActif === 'Tech' }]" @click="filtreActif = 'Tech'">Tech</button>
  <button :class="['filtre-btn', { actif: filtreActif === 'Design' }]" @click="filtreActif = 'Design'">Design</button>
  <button :class="['filtre-btn', { actif: filtreActif === 'Business' }]" @click="filtreActif = 'Business'">Business</button>
  <button :class="['filtre-btn', { actif: filtreActif === 'Marketing' }]" @click="filtreActif = 'Marketing'">Marketing</button>
  <button :class="['filtre-btn', { actif: filtreActif === 'Éducation' }]" @click="filtreActif = 'Éducation'">Éducation</button>
  <button :class="['filtre-btn', { actif: filtreActif === 'Santé' }]" @click="filtreActif = 'Santé'">Santé</button>
</div>

<div class="container">
<CardIdee
    v-for="idee in ideesFiltrees"
    :key="idee.id"
    :id="idee.id"
    :categorie="idee.categorie"
    :titre="idee.titre"
    :description="idee.description"
    @supprimer="supprimerIdee"
/>
</div>


</template>
<script setup>
import CardIdee from '../components/CardIdee.vue'
import {useIdeeStore} from '../stores/ideeStore.js'
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { ref } from 'vue'
import {onMounted} from 'vue'
const ideeStore = useIdeeStore()

onMounted(() => {
  ideeStore.chargerIdees()
})

const filtreActif = ref('Tous')
const ideesFiltrees = computed(() => {
  if (filtreActif.value === 'Tous') {
    return ideeStore.idees
  } else {
    return ideeStore.idees.filter(i => i.categorie === filtreActif.value)
  }
})

function supprimerIdee(id) {
  ideeStore.supprimerIdee(id)  
}
</script>
<style  scoped>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-add {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1d9e75;
  color: white;
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  transition: 0.2s;
}

.btn-add:hover {
  background: #17825f;
  transform: translateY(-2px);
}

.filtres {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.filtre-btn {
  padding: 7px 16px;
  border-radius: 20px;
  border: 0.5px solid rgba(29, 158, 117, 0.3);
  background: transparent;
  color: #8888aa;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;
}

.filtre-btn:hover {
  border-color: rgba(29, 158, 117, 0.7);
  color: #5dcaa5;
}

.filtre-btn.actif {
  background: rgba(29, 158, 117, 0.12);
  border-color: rgba(93, 202, 165, 0.3);
  color: #5dcaa5;
}
</style>