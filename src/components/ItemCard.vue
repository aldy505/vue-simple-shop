<template>
  <div
    class="
      grid grid-cols-1
      p-6
      dark:text-light-50
      hover:bg-gray-300
      dark:hover:bg-dark-100
      transition
      duraiton-300
      ease-in-out
    "
  >
    <div class="pb-4">
      <div class="aspect-w-1 aspect-h-1">
        <img :src="image" class="w-full" />
      </div>
    </div>
    <div class="pb-2">
      <h2 class="text-lg font-extrabold">{{ name }}</h2>
    </div>
    <div class="pb-2">
      {{ price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
    </div>
    <div class="pb-2">
      <div v-if="!isInCart" :key="isInCart">
        <button
          @click="addItemToCart()"
          class="bg-gray-300 dark:bg-dark-300 hover:bg-gray-400 dark:hover:bg-dark-500 p-3"
        >
          <div class="flex flex-inline content-center items-center">
            <div class="flex-initial pr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cart-plus"
                viewBox="0 0 16 16"
              >
                <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                <path
                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                />
              </svg>
            </div>
            <div class="flex-initial pr-4">Add to cart</div>
          </div>
        </button>
      </div>
      <div v-else>
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
  </div>
</template>

<script>
export default {
  name: 'ItemCart',
  props: {
    id: {
      type: Number,
      required: true,
      default: 0,
    },
    name: {
      type: String,
      required: true,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    isInCart() {
      return this.$store.getters['getCartByID'](this.id);
    },
    quantity() {
      return this.isInCart.quantity ?? 0;
    },
  },
  methods: {
    addItemToCart() {
      const { id } = this;
      const quantity = 1;
      this.$store.dispatch('addItemToCart', { id, quantity });
    },
    updateQuantity(direction) {
      const { id } = this;
      if (direction === 'up') {
        this.$store.dispatch('updateQuantity', { id, direction });
        return;
      } else if (direction === 'down') {
        if (this.isInCart.quantity === 1) {
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

<style scoped></style>
