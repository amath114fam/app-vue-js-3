import { defineStore } from 'pinia'
import { supabase } from '../supabase'
export const useIdeeStore = defineStore('idees', {
  state: () => ({
    idees: []
  }),

  actions: {
    async chargerIdees() {
      try {
        const { data, error } = await supabase.from('idees').select('*')
        if (error) throw error
        this.idees = data
        
      } catch (error) {
        console.error(error)
      }
      
    },

    async ajouterIdee(titre, categorie, description) {
      try {
        const { error } = await supabase.from('idees').insert({ titre, categorie, description })
        if (error) throw error
        await this.chargerIdees()
      } catch (error) {
        console.error(error)
      }
    },

    async supprimerIdee(id) {
      try {
        const { error } = await supabase.from('idees').delete().eq('id', id)
        if (error) throw error
        await this.chargerIdees()
      } catch (error) {
        console.error(error)
      }
    },

    async updateIdee(id, titre, categorie, description) {
      try {
        const { error } = await supabase.from('idees').update({ titre, categorie, description }).eq('id', id)
        if (error) throw error
        await this.chargerIdees()
      } catch (error) {
        console.error(error)
      }
    }
  }
})