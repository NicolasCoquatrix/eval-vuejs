<script setup>
import InvoiceForm from '@/components/InvoiceForm.vue'

</script>

<template>
  <h1 class="text-center alert alert-primary"><i class="bi bi-cash-stack"></i> Ajouter une facture</h1>

  <InvoiceForm :newInvoice="true"></InvoiceForm>
</template>

<style scoped>

</style>
