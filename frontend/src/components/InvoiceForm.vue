<script setup>
import { ref } from 'vue'
import { invoiceInterface } from '@/interfaces/invoice'
import { useInvoiceStore } from '@/stores/invoices'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  newInvoice : {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => ({
      number: '',
      description: '',
      issueDate: '',
      customer: ''
    })
  },
})

const form = ref({ ...invoiceInterface })
form.value = { ...props.data }

const invoiceStore = useInvoiceStore()
const { createInvoice, updateInvoice } = invoiceStore

const onSubmit = async () => {
  if (props.newInvoice) {
    await createInvoice(form.value)
  } else {
    await updateInvoice(props.data.id,form.value)
  }

  router.push('/invoices')
}
</script>

<template>
  <div class="mb-3">
    <form @submit.prevent="onSubmit">
      <div class="form-group mb-3">
        <label for="number">Facture N°</label>
        <input v-model="form.number" type="text" class="form-control" id="number" placeholder="Numéro de la facture">
      </div>
      <div class="form-group  mb-3">
        <label for="description">Description</label>
        <input v-model="form.description" type="description" class="form-control" id="description" placeholder="Description de la facture">
      </div>
      <div class="form-group mb-3">
        <label for="issue-date">Émise le</label>
        <input v-model="form.issueDate" type="date" class="form-control" id="issue-date">
      </div>
      <label for="client">Client</label>
      <select v-model="form.customer" class="form-select mb-3" id="client">
        <option value="">Sélectionnez un client</option>
        <option value="Nicolas">Nicolas</option>
        <option value="Stéphane">Stéphane</option>
        <option value="Alain">Alain</option>
      </select>
      <div class="d-flex gap-3">
        <RouterLink class="btn btn-danger w-50" to="/invoices"><i class="bi bi-cash-stack"></i> Annuler</RouterLink>
        <button type="submit" class="btn btn-primary w-100"><i class="bi bi-check-circle"></i> Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>

