<template>
<div>
    <ul id="nomes" :class="{lado: lado}" v-if="nomes.length > 0">
        <li v-for="(item, key) in nomes" :key="key" :class="{lado: lado}">
            <router-link :to="{name: 'pessoa', params: {nome: item}}">{{item}}</router-link>
        </li>
    </ul>
    <p v-else style="text-align: center; color: red; font-weight: bold">Não foi possível gerar nomes</p>
</div>
</template>

<style scoped>
    a{
        color: inherit;
        text-decoration: none;
    }
    ul{
        list-style: none;
        padding: 0;
        margin: 10px 0;
    }
    li{
        text-align: center;
        text-transform: uppercase;
        overflow-wrap: break-word;
        word-wrap: break-word;
        max-width: 300px;
        margin: 0 auto;
        padding: 10px 0;
        cursor: pointer;
    }
    li:hover{
        background: black;
        color: white;
    }
    ul li:not(:last-child){
        border-bottom: 1px solid black;
    }

    
    li.lado{
        text-align: center;
        display: inline;
        text-transform: uppercase;
        overflow-wrap: break-word;
        word-wrap: break-word;
        max-width: 300px;
        margin: 20px auto;
        padding: 10px 10px;
        line-height: 30px;
        cursor: pointer;
    }
    li.lado:hover{
        background: black;
        color: white;
    }
    ul.lado li.lado:not(:first-child){
        border-left: 1px solid black;
    }
    ul.lado li.lado:not(:last-child){
        border-bottom: none;
    }
    

</style>

<script>
export default {
  name: 'Lista',
  data(){
      return {
        lado: false,
        altura: 0,
      }
  },
  updated(){
    if(this.nomes.length * 39 > 700) this.lado = true;
    else this.lado = false;
  },
  props: {
    nomes: Array,
  },
  methods:{
  }
}
</script>