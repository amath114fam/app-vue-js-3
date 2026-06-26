<template>
  <div class="page-wrapper">
    <div class="page-header">
      <h1>Mes idées</h1>
      <div class="content-btn">
        <RouterLink to="/ajouter-idee" class="btn-add">
          <i class="ti ti-plus"></i>
          Ajouter une idée
        </RouterLink>
        <button class="btn-add" @click="logOut">Déconnexion</button>
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

    <div class="cards-grid">
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
  </div>
</template>

<script setup>
import CardIdee from '../components/CardIdee.vue'
import { useIdeeStore } from '../stores/ideeStore.js'
import { RouterLink } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const ideeStore = useIdeeStore()
const authStore = useAuthStore()

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

async function logOut() {
  try {
    await authStore.deconnexion()
    router.push('/login')
  } catch (error) {
    console.error('Erreur de déconnexion :', error)
  }
}
</script>

<style scoped>
/* ── Wrapper global ── */
.page-wrapper {
  padding: 2rem;
}

/* ── Header ── */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}

.page-header h1 {
  font-size: 1.8rem;
  white-space: nowrap;
}

.content-btn {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
}

/* ── Boutons ── */
button {
  border: none;
  cursor: pointer;
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
  white-space: nowrap;
}

.btn-add:hover {
  background: #17825f;
  transform: translateY(-2px);
}

/* ── Filtres ── */
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

/* ── Grille de cartes ── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

/* ══════════════════════════════════
   RESPONSIVE — Tablette (≤ 768px)
══════════════════════════════════ */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 1.25rem;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .page-header h1 {
    font-size: 1.5rem;
  }

  .content-btn {
    width: 100%;
    justify-content: flex-start;
  }

  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

/* ══════════════════════════════════
   RESPONSIVE — Mobile (≤ 480px)
══════════════════════════════════ */
@media (max-width: 480px) {
  .page-wrapper {
    padding: 1rem;
  }

  .page-header h1 {
    font-size: 1.3rem;
  }

  .content-btn {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .btn-add {
    justify-content: center;
    width: 100%;
    padding: 10px;
  }

  .filtres {
    gap: 6px;
  }

  .filtre-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>