<script setup>
import { ref } from 'vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import { useIdeeStore } from '../stores/ideeStore.js'

const router = useRouter()
const ideeStore = useIdeeStore()

const nouveauTitre = ref('')
const nouvelleCategorie = ref('')
const nouvelleDescription = ref('')

// function pour ajouter une nouvelle idée

function addIdee() {
  validerTitre()
  validerSelect()
  validerDescription()

  if (erreurTitre.value || erreurCategorie.value || erreurDescription.value) return


  ideeStore.ajouterIdee(
    nouveauTitre.value,
    nouvelleCategorie.value,
    nouvelleDescription.value
  )
  router.push('/')
}

//
const erreurTitre = ref('')
const erreurCategorie = ref('')
const erreurDescription = ref('')

// function pour valider le titre
function validerTitre() {
  if (nouveauTitre.value.trim() === '') {
    erreurTitre.value = 'Le titre est obligatoire'
  } else if (nouveauTitre.value.length < 3) {
    erreurTitre.value = 'Le titre doit faire au moins 3 caractères'
  } else {
    erreurTitre.value = ''  
  }
}

// function pour valider la catégorie
function validerSelect() {
  if (nouvelleCategorie.value === '') {
    erreurCategorie.value = 'Veuillez sélectionner une catégorie'
  } else {
    erreurCategorie.value = ''
  }
}
// function pour valider la description
function validerDescription() {
  if (nouvelleDescription.value.trim() === '') {
    erreurDescription.value = 'La description est obligatoire'
  } else if (nouvelleDescription.value.length < 10) {
    erreurDescription.value = 'La description doit faire au moins 10 caractères'
  } else {
    erreurDescription.value = ''
  }
}
</script>

<template>
  <div class="formulaire">
     <RouterLink to="/" class="btn-retour">
      ← Retour
    </RouterLink>
    <h2>Ajouter une idée</h2>

    <div class="champ">
      <label>Titre</label>
      <input v-model="nouveauTitre" placeholder="Ex: Application mobile..." @blur="validerTitre" /> 
      <span v-if="erreurTitre" style="color: red; font-size: 12px;">
        {{ erreurTitre }}
      </span>
    </div>

    <div class="champ">
      <label>Catégorie</label>
       <select v-model="nouvelleCategorie" @blur="validerSelect">
            <option disabled value="">Choisir une catégorie</option>
            <option value="Tech">Tech</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
            <option value="Éducation">Éducation</option>
            <option value="Santé">Santé</option>
        </select>
      <span v-if="erreurCategorie" style="color: red; font-size: 12px;">
        {{ erreurCategorie }}
      </span>
    </div>

    <div class="champ">
      <label>Description</label>
      <textarea v-model="nouvelleDescription" placeholder="Décris ton idée..." @blur="validerDescription"></textarea>
      <span v-if="erreurDescription" style="color: red; font-size: 12px;">
        {{ erreurDescription }}
      </span>
    </div>

    <button  @click="addIdee">Ajouter l'idée</button>
  </div>
</template>

<style scoped>
.formulaire {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

h2 {
  margin: 0;
  font-size: 20px;
  color: #1a1a2e;
}

.champ {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
input,
textarea,
select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  background: #fff;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #6c63ff;
  box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.15);
}

select {
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='%236c63ff' viewBox='0 0 16 16'%3E%3Cpath d='M3.204 5h9.592L8 10.481 3.204 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

select option {
  color: #1a1a2e;
}
button {
  padding: 12px;
  background: #6c63ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #574fd6;
}
.btn-retour {
  align-self: flex-start;
  text-decoration: none;
  color: #6c63ff;
  font-weight: 600;
  font-size: 14px;
  transition: 0.2s;
}

.btn-retour:hover {
  color: #574fd6;
  transform: translateX(-3px);
}
</style>