<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <button
        class="btn btn-outline-secondary" type="button"
        @click='decreaseNumber'
        @mousedown='whileMouseDown(decreaseNumber)'
        @mouseup='clearTimer'>-</button>
    </div>
    
    <input
      type='number'
      class="form-control text-center bg-transparent"
      v-bind:value='numericValue'
      @keypress='validateInput'
      @input='inputValue'
      :min='min'
      :max='max'
      debounce='500'/>
    
    <div class="input-group-append">
      <button
        class="btn btn-outline-secondary" type="button"
        @click='increaseNumber'
        @mousedown='whileMouseDown(increaseNumber)'
        @mouseup='clearTimer'>+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputSpinner',
  data: function() {
    return {
      numericValue: this.value,
      timer: null
    };
  },
  model:{
    prop: 'value',
    value: 'input'
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 100,
      type: Number
    },
    step: {
      default: 1,
      type: Number
    },
    mouseDownSpeed: {
      default: 200,
      type: Number
    }
  },
  methods: {
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    whileMouseDown(callback) {
      if (this.timer === null) {
        this.timer = setInterval(() => {
          callback();
        }, this.mouseDownSpeed);
      }
    },
    validateInput(evt) {
      //Validar que sea un numero sin decimales
      evt = evt ? evt : window.event;
      let key = evt.keyCode || evt.which;
      key = String.fromCharCode(key);
      const regex = /[0-9]/;
      if (!regex.test(key)) {
        evt.returnValue = false;
        if (evt.preventDefault) evt.preventDefault();
      }
    },
    increaseNumber() {
      this.setNumericValue(this.numericValue + this.step);
    },
    decreaseNumber() {
      this.setNumericValue(this.numericValue - this.step);
    },
    inputValue(evt) {
      this.setNumericValue(parseInt(evt.target.value));
    },
    setNumericValue(val){
      if (!val) {
        this.numericValue = parseInt(this.min);
        this.$forceUpdate(); //El valor puede terminar siendo el mismo, vue no reacciona porque asume que no hay cambio
        this.setNumericValue(parseInt(this.min));
      }
      if (val < this.min) {
        this.numericValue = parseInt(this.min);
        this.$forceUpdate(); //El valor puede terminar siendo el mismo, vue no reacciona porque asume que no hay cambio
        this.setNumericValue(parseInt(this.min));
      }
      if (val > this.max) {
        this.numericValue = parseInt(this.max);
        this.$forceUpdate(); //El valor puede terminar siendo el mismo, vue no reacciona porque asume que no hay cambio
        this.setNumericValue(parseInt(this.max));
      }
      if (val <= this.max && val >= this.min) {
        this.$emit('input', val);
      }
    }
  },
  watch: {
    value (val){
      this.numericValue = val;
    }
  }
};
</script>

<style scoped>
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
</style>