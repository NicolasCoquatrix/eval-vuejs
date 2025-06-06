<script setup>
import MainHeader from '@/components/layout/MainHeader.vue'
import MainFooter from '@/components/layout/MainFooter.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <MainHeader></MainHeader>

    <main class="flex-fill">
      <div class="container py-4">
        <RouterView />
      </div>
    </main>

    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>

</style>
