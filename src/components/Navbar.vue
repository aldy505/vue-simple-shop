<template>
  <div class="flex flex-col md:flex-row content-center dark:text-light-50 text-center">
    <div class="flex-1 hover:opacity-100 opacity-75 transition duration-500 ease-in-out">
      <router-link to="/">Home</router-link>
    </div>
    <div class="flex-1 hover:opacity-100 opacity-75 transition duration-500 ease-in-out">
      <router-link to="/checkout"
        >Checkout
        <span v-show="cartItems !== 0" class="bg-red-200 dark:bg-red-900 py-1 px-2 rounded-full">{{
          cartItems
        }}</span></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    cartItems() {
      return this.$store.getters['getTotalItems'];
    },
  },
};
</script>
