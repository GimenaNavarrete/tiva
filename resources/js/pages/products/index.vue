<template>
  <div class="row">
    <div v-for="p in products" v-bind:key="p.id" class="col-md-2">
      {{p.name}}
      <img :src="p.img" :alt="p.name">
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data: () => ({
      products: [
        {id:1, name: 'sueter', img: 'https://i.etsystatic.com/19311499/c/3000/2382/0/0/il/b4be61/1839533908/il_340x270.1839533908_lgk6.jpg'},
        {id:2, name: 'cobija', img: 'https://i.etsystatic.com/19311499/c/3000/2382/0/0/il/b4be61/1839533908/il_340x270.1839533908_lgk6.jpg'},
        {id:3, name: 'jarron', img: 'https://i.etsystatic.com/19311499/c/3000/2382/0/0/il/b4be61/1839533908/il_340x270.1839533908_lgk6.jpg'}
      ]
  })
}
</script>

<style>
</style>
