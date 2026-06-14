import {createRouter, createWebHistory} from 'vue-router'
import listeIdees from '../views/ListeIdee.vue'
import ajouterIdee from '../views/AjouterIdee.vue'
import updateIdee from '../views/UpdateIdee.vue'
import detailIdee from '../views/DetailIdee.vue'

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
    }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router