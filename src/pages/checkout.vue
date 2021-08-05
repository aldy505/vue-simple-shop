<template>
  <div class="font-body bg-light-800 dark:bg-dark-800 dark:text-light-50 min-h-screen h-full">
    <div class="container mx-auto py-8 px-4 md:px-20 lg:px-48">
      <header class="py-4">
        <div class="flex flex-col md:flex-row content-center">
          <div class="flex-2"><h1 class="text-4xl font-extrabold text-center md:text-left">Vue simple shop</h1></div>
          <div class="flex-1"><Navbar /></div>
        </div>
      </header>
      <main>
        <section v-if="cart.length !== 0" :key="cart">
          <div class="grid grid-cols-1 gap-4 py-4">
            <div v-for="item in cart" :key="item.id">
              <CartItem :id="item.id" />
            </div>
          </div>
          <div class="py-4">
            <h2 class="text-3xl font-bold">Ready to checkout?</h2>
            <div class="flex flex-col">
              <div class="flex-1">Total items: {{ totalItems }}</div>
              <div class="flex-1">
                Subtotal: {{ totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
              </div>
            </div>
          </div>
        </section>
        <section v-else class="text-center py-48">
          <p class="text-3xl font-bold">Oh, no. There's nothing here.</p>
          <p class="text-base">Shop first at our <router-link to="/" class="hover:underline">home page</router-link></p>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import CartItem from '../components/CartItem.vue';
import Footer from '../components/Footer.vue';
export default {
  components: {
    CartItem,
    Navbar,
    Footer,
  },
  computed: {
    cart() {
      return this.$store.getters['cart'];
    },
    totalItems() {
      return this.$store.getters['getTotalItems'];
    },
    totalPrice() {
      return this.$store.getters['getTotalPrice'];
    },
  },
};
</script>

<style></style>
