<template>
  <header class="bg-blue-500 text-white p-4 flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center">
      <span class="font-bold text-lg">Logo</span>
    </div>

    <!-- Menu -->
    <nav class="flex items-center space-x-4">
      <router-link to="/cart" class="hover:underline">
        <i class="pi pi-shopping-cart"></i>
        Cart
      </router-link>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
