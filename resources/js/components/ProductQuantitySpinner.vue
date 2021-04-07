<template>
  <div>
    <input-spinner
      v-bind:value='product.quantity'
      @input='inputValue'
      :min="1"
      :max="100" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import InputSpinner from './InputSpinner.vue';
export default {
  components: { InputSpinner },
  name: 'ProductQuantitySpinner',
  data: function() {
    return {
      product: this.value
    };
  },
  props: ['value'],
  model:{
    prop: 'value',
    value: 'input'
  },
  methods: {
    inputValue(evt) {
      this.setItemAmount({product: this.product, quantity: evt});
    },
    ...mapActions({
      setItemAmount: 'cart/setItemAmount'
    }),
  },
  watch: {
    value (value) {
      this.product = value;
    }
  }
};
</script>