<script setup>

</script>

<template>
  <header class="bg-primary">
    <nav class="container navbar navbar-expand">
      <div class="container-fluid">
        <RouterLink class="navbar-brand text-light fw-bold" to="/"><i class="bi bi-wallet"></i> Factures</RouterLink>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto mb-lg-0">
            <li class="nav-item">
               <RouterLink activeClass="active text-dark bg-primary-subtle" class="nav-link text-light rounded" to="/"><i class="bi bi-house"></i>  Accueil</RouterLink>
            </li>
            <li class="nav-item">
               <RouterLink activeClass="active text-dark bg-primary-subtle" class="nav-link text-light rounded" to="/invoices"><i class="bi bi-cash-stack"></i>  Factures</RouterLink>
            </li>
            <li class="nav-item">
               <RouterLink activeClass="active text-dark bg-primary-subtle" class="nav-link text-light rounded" to="/customers"><i class="bi bi-people"></i>  Clients</RouterLink>
            </li>
            <li class="nav-item">
               <RouterLink activeClass="active text-dark bg-primary-subtle" class="nav-link text-light rounded" to="/about"><i class="bi bi-info-circle"></i>  À propos</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  border: 2px solid rgba(var(--bs-primary-rgb));
}

.nav-link:hover:not(.active) {
  border-color: var(--bs-primary-bg-subtle);
}
</style>
