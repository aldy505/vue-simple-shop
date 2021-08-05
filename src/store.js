import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import inventory from './assets/inventory.json';

const store = createStore({
  state() {
    return {
      inventory: inventory.inventory,
      cart: [],
    };
  },
  getters: {
    cart(state) {
      return state.cart;
    },
    inventory(state) {
      return state.inventory;
    },
    getItemByID(state) {
      return function (id) {
        const search = state.inventory.find((o) => o.id === id);
        if (search) return search;
        return null;
      };
    },
    getCartByID(state) {
      return function (id) {
        const searchCart = state.cart.find((o) => o.id === id);
        if (searchCart) {
          const searchInventory = state.inventory.find((o) => o.id === id);
          return { ...searchCart, ...searchInventory };
        }
        return null;
      };
    },
    getTotalItems(state) {
      let count = 0;
      const cart = state.cart;
      for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
      }
      return count;
    },
    getTotalPrice(state) {
      let price = 0;
      const cart = state.cart;
      for (let i = 0; i < cart.length; i++) {
        const inventory = state.inventory.find((o) => o.id === cart[i].id);
        price += cart[i].quantity * inventory.price;
      }
      return price;
    },
  },
  mutations: {
    addItem(state, payload) {
      state.cart.push(payload);
    },
    removeItem(state, { id }) {
      state.cart = state.cart.filter((o) => o.id !== id);
    },
    increaseQuantity(state, { id }) {
      const searchIndex = state.cart.findIndex((o) => o.id == id);
      state.cart[searchIndex].quantity += 1;
    },
    decreaseQuantity(state, { id }) {
      const searchIndex = state.cart.findIndex((o) => o.id == id);
      state.cart[searchIndex].quantity -= 1;
    },
  },
  actions: {
    addItemToCart({ commit }, { id, quantity }) {
      commit('addItem', { id, quantity });
    },
    updateQuantity({ commit }, { id, direction }) {
      if (direction === 'up') commit('increaseQuantity', { id });
      if (direction === 'down') commit('decreaseQuantity', { id });
    },
    removeItemFromCart({ commit }, { id }) {
      commit('removeItem', { id });
    },
  },
  plugins: [createPersistedState({ fetchBeforeUse: true })],
});

export default store;
