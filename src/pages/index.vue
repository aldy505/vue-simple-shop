<template>
  <div class="font-body bg-light-800 dark:bg-dark-800 dark:text-light-50 min-h-screen h-full">
    <div class="container mx-auto py-8 px-4 md:px-20 lg:px-48">
      <header class="py-4">
        <div class="flex flex-col md:flex-row content-center">
          <div class="flex-2"><h1 class="text-4xl font-extrabold text-center md:text-left">Vue simple shop</h1></div>
          <div class="flex-1"><Navbar /></div>
        </div>
      </header>
      <main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
        <div class="" v-for="product in inventory" :key="product.id">
          <ItemCard :id="product.id" :image="product.image" :name="product.name" :price="product.price" />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ItemCard from '../components/ItemCard.vue';
import Footer from '../components/Footer.vue';
export default {
  components: {
    ItemCard,
    Navbar,
    Footer,
  },
  computed: {
    inventory() {
      return this.$store.getters['inventory'];
    },
  },
};
</script>

<style></style>
