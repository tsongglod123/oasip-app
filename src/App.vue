<script setup>
import { RouterView } from "vue-router";
import VNavbar from "@/components/headers/VNavbar.vue";
</script>

<template>
  <div id="main">
    <VNavbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
