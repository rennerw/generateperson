import Home from "./components/Home.vue";
import Pessoa from "./components/Pessoa.vue";

export const routes = [
    { path: "", name:"home", component: Home, titulo: "Home", menu: true},
    { path: "/cadastro/:nome", name:"pessoa", component: Pessoa, titulo: "Pessoa", menu: false },
    { path: "*", menu: false}
]