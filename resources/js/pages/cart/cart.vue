<template>
  <div class="row">
    <div class="col-md-8 col-lg-9">
      <div class="table-responsive">
        <table class="table">
          <thead class="thead-light">
          <tr>
            <th class="px-4 py-3 text-center">Item</th>
            <th class="px-4 py-3 text-center">Cantidad</th>
            <th class="px-4 py-3 text-center">Precio</th>
            <th class="px-4 py-3 text-center">Acciones</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cart" :key="item.id">
              <td class="p-4">
                <div class="media">
                  <a class="thumbnail pull-left" href="#"> <img src="https://via.placeholder.com/100" class="rounded mr-3" style="width: 72px; height: 72px;" alt="product"> </a>
                  <div class="media-body">
                    <h5><a href="#" class="text-dark">{{item.name}}</a></h5>
                    <div><small class="text-muted">por <a href="#" class="text-muted">Nombre de un Creador</a></small></div>
                  </div>
                </div>
              </td>
              <td class="p-4"><product-quantity-spinner v-model="cart[index]" style="width: 120px;" /></td>
              <td class="p-4">
                <div class="text-right">{{formatCurrency(cartLineTotal(item))}}</div>
                <div v-if="item.quantity > 1" class="text-right"><small class="text-muted">individual {{formatCurrency(item.price)}}</small></div>
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  @click="removeFromCart(index)">
                    Remover
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
              
              <input v-model="slug">
              <button
                class="btn btn-info"
                @click="addToCart({
                    user_id: '1',
                    category_id: '1',
                    slug: slug,
                    name: 'Sueter de hilo de lana',
                    description: 'Sueter cn diseñ personalizado realizado a mano de lana',
                    price: Math.floor(Math.random() * (100)) + 1, //12.5,
                    is_available: true,
                    ranking: 4,
                    quantity: 1
                  })">
                  SOLO DE PRUEBA Agregar producto
              </button>
    </div>

    <div class="col-md-4 col-lg-3">
      <card>
        <h3>Total ({{cartCount + ' ' + (cartCount > 1 ? 'items' : 'item')}})</h3>
        <div class="d-flex justify-content-between my-4">
          <span>Total</span>
          <span>{{formatCurrency(total)}}</span>
        </div>
        <button type="button" class="btn btn-primary btn-block">Realizar Orden</button>
        <button type="button" class="btn btn-outline-secondary btn-block">Seguir comprando</button>
      </card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import InputSpinner from '../../components/InputSpinner.vue';

export default {
  components: { InputSpinner },
  middleware: 'guest',

  data: () => ({
    slug: 'sueter',
  }),

  computed: {
    ...mapGetters({
      cart: 'cart/cart',
      cartCount: 'cart/cartCount'
    }),

    total() {
      if (!this.cart) return;
      return this.cart.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },

  methods: {
    ...mapActions({
      removeFromCart: 'cart/removeFromCart',
      clearCart: 'cart/clearCart',
      addToCart: 'cart/addToCart' //TODO Solo de prueba remover despues porque no se usara
    }),

    formatCurrency(price){
      //TODO Mover a un Mixin y ver si se configurara otra currency que la de us
      return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    },

    cartLineTotal(item) {
     return item.price * item.quantity; 
    }
  },
}
</script>

<style>
</style>
