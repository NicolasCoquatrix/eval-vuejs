import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoices = ref([])
  const invoice = ref(null)

  const taxes = 0.20

  const invoicesCount = computed(() => invoices.value?.length || 0)

  const calculateInvoiceNoVAT = (currentInvoice) => {
    if (!currentInvoice || !currentInvoice.services) return 0
    const servicesTotal = currentInvoice.services.reduce((sum, service) => {
      return sum + service.quantity * service.unitPrice
    }, 0)
    const discount = currentInvoice.discount || 0
    return servicesTotal - discount
  }

  const calculateInvoiceVAT = (currentInvoice) => {
    const noVAT = calculateInvoiceNoVAT(currentInvoice)
    return noVAT * (1 + taxes)
  }

  const invoiceAddPrices = (currentInvoice) => {
    currentInvoice.totalNoVAT = calculateInvoiceNoVAT(currentInvoice)
    currentInvoice.totalVAT = calculateInvoiceVAT(currentInvoice)
    return currentInvoice
  }

  const getInvoices = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`)
    invoices.value = response.data.map(invoiceAddPrices)
  }

  const getInvoice = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/invoices/${id}`)
    invoice.value = invoiceAddPrices(response.data)
  }

  const createInvoice = async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/invoices`, data)
    invoice.value = invoiceAddPrices(response.data)
  }

  const updateInvoice = async (id, data) => {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/invoices/${id}`,
      data,
    )
    invoice.value = invoiceAddPrices(response.data)
  }

  const deleteInvoice = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/invoices/${id}`)
    invoices.value = invoices.value.filter(inv => inv.id !== id && inv.number !== id)
  }

  return {
    invoices,
    invoice,
    invoicesCount,
    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
  }
})
