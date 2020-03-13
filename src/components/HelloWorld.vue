<template>
  <div class="hello">
    <div class="center">
      <label for="quantidade">Quantidade de pessoas</label>
      <input type="text" id="quantidade" autocomplete="off" v-model="quantidade" @keydown.enter="generate"/>
      <button @click="generate">Gerar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      quantidade: 0
    }
  },
  props: {
    msg: String,
    quantidade2: Number
  },
  created(){
    this.quantidade = this.quantidade2 > 0 ? this.quantidade2 : 0;
  },
  methods:{
    generate(){
      fetch("http://localhost:8000/api/nome?quantidade="+this.quantidade)
      .then(res => res.json())
      .then(res => {
        this.$emit("nomeGerado",res);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center{  
  border-radius: 0px;
  width: 300px;
  margin: 0 auto;
}
.center input{
  height: 50px;
  font-size: 1.5rem;
  display: block;
}
.center label{
  font-weight: bold;  
  text-align: center;
  display: block;
}
.center button:active{
  color: black;
  background: #ccc;
}
.center button{
  border: none;
  display: block;
  color: white;
  background: black;
  height: 40px;
  padding: 0 20px;
  margin: 0 auto;
}
</style>
