import {createRouter, createWebHistory} from 'vue-router'
import listeIdees from '../views/ListeIdee.vue'
import ajouterIdee from '../views/AjouterIdee.vue'
import updateIdee from '../views/UpdateIdee.vue'
import detailIdee from '../views/DetailIdee.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/authStore.js'

const routes = [
    {
        path: '/',
        name: 'ListIdees',
        component: listeIdees
    },
    {
        path: '/ajouter-idee',
        name: 'AjouterIdee',
        component: ajouterIdee
    },
    {
        path: '/update-idee/:id',
        name: 'UpdateIdee',
        component: updateIdee,
    },
    {
        path: '/detail-idee/:id',
        name: 'DetailIdee',
        component: detailIdee,
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  const estConnecte = authStore.user !== null

  if (to.path === '/login' && estConnecte) {
    return '/'
  }

  if (to.path !== '/login' && !estConnecte) {
    return '/login'  
  }
})

export default router