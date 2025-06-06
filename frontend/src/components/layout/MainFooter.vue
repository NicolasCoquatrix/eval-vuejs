<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark text-center py-3 border-top">
    <div class="container">
      <span class="text-light">©{{ currentYear }} - Évaluation finale VueJS - Nicolas Coquatrix</span>
    </div>
  </footer>
</template>
