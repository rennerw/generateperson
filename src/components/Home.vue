<template>
  <div>
    <h1 style="text-align: center;">Gerador de Pessoa</h1>
    <HelloWorld @nomeGerado="getNomes" :quantidade2="this.nomes.length"/>
    <section @nomeGerado="getNomes">
      <lista :nomes="nomes"></lista>
    </section>
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue';
import Lista from './Lista.vue';

export default {
  name: 'Home',
  data(){
    return {
      nomes: [],
      listaAntiga: []
    }
  },
  components: {
    HelloWorld,
    Lista
  },
  methods:{
    getNomes(res){
      this.nomes = res;
      window.localStorage.listaNomes = JSON.stringify(this.nomes);
    }
  },
  created(){
    if(window.localStorage.listaNomes) this.nomes = JSON.parse(window.localStorage.listaNomes);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
  width: 900px;
  margin: 0 auto;
}
</style>
