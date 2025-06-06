<script setup>
import { onBeforeMount } from 'vue'
import { useInvoiceStore } from '@/stores/invoices'
import { storeToRefs } from 'pinia'
import InvoiceForm from '@/components/InvoiceForm.vue'

const props = defineProps({
  invoicesId: {
    type: String,
    default: '',
  }
})

const invoiceStore = useInvoiceStore()
const { invoice } = storeToRefs(invoiceStore)
const { getInvoice } = invoiceStore

onBeforeMount(async () => {
  await getInvoice(props.invoicesId)
})
</script>

<template>
  <div v-if="invoice">
    <h1 class="text-center alert alert-primary"><i class="bi bi-cash-stack"></i> Éditer une facture</h1>

    <InvoiceForm :data="invoice"></InvoiceForm>
  </div>

  <div v-else>
    <h1 class="text-center alert alert-danger"><i class="bi bi-bug"></i> Erreur 404</h1>
    <p class="text-center">Cette facture n'existe pas ou plus.</p>
    <RouterLink class="btn btn-primary w-100" to="/invoices"><i class="bi bi-cash-stack"></i> Retour à la liste des factures</RouterLink>
  </div>

</template>

<style scoped>

</style>
