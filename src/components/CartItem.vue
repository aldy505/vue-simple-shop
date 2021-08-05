<template>
  <div class="flex flex-col md:flex-row items-center py-4">
    <div class="flex-1 pb-4 md:pb-0 md:pr-4">
      <div class="aspect-none md:aspect-w-1 md:aspect-h-1">
        <img :src="image" class="w-full md:w-auto max-h-80" />
      </div>
    </div>
    <div class="flex-1 pb-4 md:pb-0">
      <div class="flex flex-col">
        <div class="flex-1">
          <strong>{{ name }}</strong>
        </div>
        <div class="flex-1">
          {{ price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </div>
      </div>
    </div>
    <div class="flex-1">
      <div class="flex flex-inline items-center content-center">
        <div class="flex-initial pr-4">
          <button
            @click="updateQuantity('down')"
            class="bg-gray-300 dark:bg-dark-300 hover:bg-gray-400 dark:hover:bg-dark-500 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
        </div>
        <div class="flex-initial pr-4">
          {{ quantity }}
        </div>
        <div class="flex-initial pr-4">
          <button
            @click="updateQuantity('up')"
            class="bg-gray-300 dark:bg-dark-300 hover:bg-gray-400 dark:hover:bg-dark-500 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  computed: {
    name() {
      return this.$store.getters['getCartByID'](this.id).name;
    },
    price() {
      return this.$store.getters['getCartByID'](this.id).price;
    },
    image() {
      return this.$store.getters['getCartByID'](this.id).image;
    },
    quantity() {
      return this.$store.getters['getCartByID'](this.id).quantity;
    },
  },
  methods: {
    updateQuantity(direction) {
      const { id } = this;
      if (direction === 'up') {
        this.$store.dispatch('updateQuantity', { id, direction });
        return;
      } else if (direction === 'down') {
        if (this.quantity === 1) {
          this.$store.dispatch('removeItemFromCart', { id });
          return;
        }
        this.$store.dispatch('updateQuantity', { id, direction });
      }
      return;
    },
  },
};
</script>

<style></style>
