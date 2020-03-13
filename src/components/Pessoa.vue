<template>
<div>
    <div class="page">
        <div class="img">
            <img src="../assets/loading.gif" alt="Carregando" width="150" height="175px" v-if="!foto">
            <img :src="foto" :alt="nome" width="150" height="175px" v-else>
        </div>
        <div class="personal">
            <p><strong>Nome: </strong>{{nome}}</p>

            <p v-if="!mae" class="loadingText"><strong>Nome Mãe: </strong>{{textLoading}}</p>
            <p v-else><strong>Nome Mãe: </strong>{{mae}}</p>

            <p v-if="!pai" class="loadingText"><strong>Nome Pai: </strong>{{textLoading}}</p>
            <p v-else><strong>Nome Pai: </strong>{{pai}}</p>
        </div>
        <div class="identifications">
            <p><strong>RG: </strong>{{rg}}</p>
            <p><strong>CPF: </strong>{{cpf}}</p>
            <p><strong>Timestamp: </strong>{{Math.floor(Date.now() / 1000)}}</p>
        </div>
    </div>
</div>
</template>

<style scoped>
    .page{
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
    }

    .personal p{
        text-transform: uppercase;
        overflow-wrap: break-word;
        word-wrap: break-word;
    }
</style>


<script>
export default {
  name: 'Pessoa',
  data(){
      return {
          nome: "",
          cpf: "",
          rg: "",
          foto: "",
          mae: "",
          pai: "",
          textLoading: "",
      }
  },
  watch:{
      textLoading(){
        if(this.textLoading == "Loading..."){
            this.textLoading = "";
            this.typeWriter("Loading...");
        }
      }
  },
  methods:{
    generateCPF(){
        fetch("http://localhost:8000/api/cpf")
        .then(res => res.json())
        .then(res => {
            this.cpf = res[0];
        });
    },
    generateRG(){
        fetch("http://localhost:8000/api/rg")
        .then(res => res.json())
        .then(res => {
            this.rg = res[0];
        });
    },
    generateParents(){
        fetch("http://localhost:8000/api/nome?pais=1")
        .then(res => res.json())
        .then(res => {
            this.mae = res[0];
            this.pai = res[1];
        });
    },
    typeWriter(elemento){
        const textoArray = elemento.split('');
        
        //e.target.innerHTML = '';

        for(let i = 0; i < textoArray.length; i++) {
            setTimeout(() => {
                this.textLoading += textoArray[i]
            }, 100 * i);
        }
    },
    getImagem(){
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://www.thispersondoesnotexist.com/image'
        fetch(proxyUrl + targetUrl)
        .then(resp => {
            const reader = resp.body.getReader();
            return new ReadableStream({
                start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                        controller.close();
                        return;
                    }
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                    });
                }
                }  
            })
        })
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(url => this.foto = url)
        .catch(e => console.log(e));
    }
  },
  created(){
      this.nome = this.$route.params.nome;
      this.getImagem();
      this.typeWriter("Loading...");
      this.generateRG();
      this.generateCPF();
      this.generateParents();
  },
  updated(){
    if(this.mae && this.pai){
        this.textLoading = "";
    }
  },
  
//   props: {
//     nome: Array,
//   },
}
</script>