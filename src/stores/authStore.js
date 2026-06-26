import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,  
  }),

  actions: {
   async inscription(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    this.user = data.user  
    return null    
  } catch (error) {
    return 'Erreur lors de l\'inscription'
  }
},

async connexion(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    this.user = data.user  
    return null 

  } catch (error) {
    return "Adresse email ou mot de passe incorrect"
  }
},

async deconnexion() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    this.user = null  
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error)
  }
},

async initialiserSession() {
  const { data } = await supabase.auth.getSession()
  this.user = data.session?.user ?? null
  console.log(this.user);
}
}
})