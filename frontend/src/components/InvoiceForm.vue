<script setup>
import { ref, computed } from 'vue'
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

const invoiceStore = useInvoiceStore()
const { createInvoice, updateInvoice } = invoiceStore

const form = ref({ ...invoiceInterface })
form.value = { ...props.data }
if (!form.value.services) form.value.services = []

const addService = () => {
  form.value.services.push({
    name: '',
    quantity: 1,
    unitPrice: 0
  })
}

const removeService = (index) => {
  form.value.services.splice(index, 1)
}

const totalNoVAT = computed(() => {
  const totalServices = form.value.services?.reduce((sum, service) => {
    return sum + (service.quantity * service.unitPrice)
  }, 0) || 0
  return Math.max(0, totalServices - form.value.discount)
})

const totalVAT = computed(() => {
  return +(totalNoVAT.value * 1.2).toFixed(2)
})

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
      <div class="row">
        <div class="col-6 form-group mb-3">
          <label for="number" class="fw-bold">Facture N°</label>
          <input v-model="form.number" type="text" class="form-control" id="number" placeholder="Numéro de la facture">
        </div>
        <div class="col-6 form-group mb-3">
          <label for="description" class="fw-bold">Description</label>
          <input v-model="form.description" type="description" class="form-control" id="description" placeholder="Description de la facture">
        </div>
      </div>
      <div class="row">
        <div class="col-6 form-group mb-3">
          <label for="issue-date" class="fw-bold">Émise le</label>
          <input v-model="form.issueDate" type="date" class="form-control" id="issue-date">
        </div>
        <div class="col-6 form-group mb-3">
          <label for="client" class="fw-bold">Client</label>
          <select v-model="form.customer" class="form-select mb-3" id="client">
            <option value="">Sélectionnez un client</option>
            <option value="Nicolas">Nicolas</option>
            <option value="Stéphane">Stéphane</option>
            <option value="Alain">Alain</option>
          </select>
        </div>
      </div>
      <div class="form-group mb-3">
        <p class="fw-bold mb-0">Services</p>
        <table class="table align-middle">
          <thead>
            <tr>
              <th></th>
              <th scope="col">Nom</th>
              <th scope="col">Quantité</th>
              <th scope="col">Prix unitaire</th>
              <th scope="col">Montant total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(service, index) in form.services" :key="index">
              <td>
                <p class="alert alert-primary text-center py-0 px-2 m-0">{{ index + 1 }}</p>
              </td>
              <td>
                <input v-model="service.name" type="text" class="form-control" placeholder="Nom du service">
              </td>
              <td>
                <input v-model.number="service.quantity" type="number" min="1" class="form-control">
              </td>
              <td>
                <input v-model.number="service.unitPrice" type="number" min="0" class="form-control">
              </td>
              <td>
                {{ service.quantity * service.unitPrice }} €
              </td>
              <td>
                <button type="button" class="btn btn-sm btn-outline-danger" @click="removeService(index)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-outline-primary w-100" @click="addService">
          <i class="bi bi-plus-circle"></i> Ajouter un service
        </button>
      </div>
      <div class="row">
        <div class="col-6 form-group mb-3">
          <label for="discount" class="fw-bold">Remise</label>
          <input v-model.number="form.discount" type="number" class="form-control" id="discount" placeholder="Appliquer une remise sur la facture">
        </div>
        <div class="col-6 form-group mb-3">
          <label for="amountPaid" class="fw-bold">Montant déjà payé</label>
          <input v-model.number="form.amountPaid" type="number" class="form-control" id="amountPaid" placeholder="Montant déjà payé par le client">
        </div>
      </div>
      <div class="d-flex gap-3">
        <p class="alert alert-secondary flex-grow-1 text-center"><b>Montant total HT : </b>{{ totalNoVAT }} €</p>
        <p class="alert alert-secondary flex-grow-1 text-center"><b>TVA (20%) : </b>{{ (totalVAT - totalNoVAT).toFixed(2) }} €</p>
        <p class="alert alert-secondary flex-grow-1 text-center"><b>Montant total TTC : </b>{{ totalVAT }} €</p>
      </div>
      <div class="d-flex gap-3">
        <RouterLink class="btn btn-danger" to="/invoices"><i class="bi bi-x-circle"></i> Annuler</RouterLink>
        <button type="submit" class="btn btn-primary flex-grow-1"><i class="bi bi-check-circle"></i> Enregistrer la facture</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>

