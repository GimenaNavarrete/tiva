import * as types from '../mutation-types'

//Persisitir el carrito en almacenamiento interno
let cartLocalStorage = window.localStorage.getItem('cartLocalStorage');

// state
export const state = {
  cart: cartLocalStorage ? JSON.parse(cartLocalStorage) : [],
}

// getters
export const getters = {
  cart: state => state.cart,
  cartCount: state => state.cart.reduce((p, {quantity}) => p + quantity, 0)
}

// mutations
export const mutations = {
  [types.ADD_TO_CART] (state, product) {
    let productInCartIndex = state.cart.findIndex(item => item.slug === product.slug);
    if (productInCartIndex !== -1) {
      //Producto ya existe
      state.cart[productInCartIndex].quantity++;
      return;
    } else {
      //Agregar producto
      product.quantity = 1;
      state.cart.push(product);
    }
    saveToLocalStorage(state);
  },

  [types.REMOVE_FROM_CART](state, index) {
    state.cart.splice(index, 1);
    saveToLocalStorage(state);
  },

  [types.SET_ITEM_AMOUNT] (state, {product, quantity}) {
    let productInCartIndex = state.cart.findIndex(item => item.slug === product.slug);
    state.cart[productInCartIndex].quantity = quantity;
    saveToLocalStorage(state);
  },

  [types.UPDATE_CART] (state, cart) {
    state.cart = cart;
    saveToLocalStorage(state);
  }
}

// actions
export const actions = {
  addToCart({commit}, product) {
    commit(types.ADD_TO_CART, product);
  },

  removeFromCart({commit}, index) {
    commit(types.REMOVE_FROM_CART, index);
  },

  setItemAmount({commit}, {product, quantity}) {
    commit(types.SET_ITEM_AMOUNT, {product, quantity});
  },

  updateCart({commit}, cart) {
    commit(types.UPDATE_CART, cart);
  },

  clearCart({commit}) {
    commit(types.UPDATE_CART, []);
  }
}


function saveToLocalStorage(state) {
  window.localStorage.setItem('cartLocalStorage', JSON.stringify(state.cart));
}