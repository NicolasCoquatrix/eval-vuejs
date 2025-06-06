<script setup>
import { onBeforeMount } from 'vue'
import { useInvoiceStore } from '@/stores/invoices'
import { storeToRefs } from 'pinia'

const invoiceStore = useInvoiceStore()
const { invoices, invoicesCount } = storeToRefs(invoiceStore)
const { getInvoices, deleteInvoice } = invoiceStore

onBeforeMount(async () => {
  await getInvoices()
})
</script>

<template>
  <h1 class="text-center alert alert-primary"><i class="bi bi-cash-stack"></i> Liste des factures</h1>
  <div class="d-flex gap-2 justify-content-between align-items-center">
    <p class="h2">Voici les {{ invoicesCount }} factures trouvées</p>
    <RouterLink class="btn btn-outline-primary" to="/invoices/new"><i class="bi bi-plus-circle-fill"></i> Ajouter une facture</RouterLink>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Description</th>
        <th scope="col">Numéro</th>
        <th scope="col">Client</th>
        <th scope="col">Prix HT</th>
        <th scope="col">Prix TTC</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <th class="fw-normal">{{ invoice.issueDate }}</th>
        <th class="fw-normal">{{ invoice.description }}</th>
        <th class="fw-normal">{{ invoice.number }}</th>
        <th class="fw-normal">{{ invoice.customer }}</th>
        <th class="fw-normal">{{ invoice.totalNoVAT }} € HT</th>
        <th class="fw-bold">{{ invoice.totalVAT }} € TTC</th>
        <td class="d-flex gap-2">
          <button class="btn btn-outline-danger w-50" @click="deleteInvoice(invoice.id)"><i class="bi bi-trash"></i> Supprimer</button>
          <RouterLink class="btn btn-outline-primary w-50" :to="`/invoices/${invoice.id}`"><i class="bi bi-pencil"></i> Éditer</RouterLink>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
