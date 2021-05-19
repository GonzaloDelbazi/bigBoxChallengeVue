<template>
  <div class="container1">
    <div class="card1">
      <div class="heading1">
        <h4 class="title1">NYTimes Books</h4>
      </div>
      <div class="row">
        <select @change="validarCategoria()" class="form-select" name="Categorias" id="opcion">
          <option  class="option" v-for="categoria in this.categorias" :key="categoria.id" 
          >{{categoria.list_name}}</option>
        </select>
        <input disabled id="name" type="text" class="form-control1" placeholder="Search by title" @keyup.enter="search()" />
      </div>
      <h3 v-if="error" class="alert alert-danger mt-4">{{this.mensajeError}}</h3>
      <h1 class="texto" v-if="encontrado">- Libros <small>encontrados</small></h1>
      <div class="content">
        <card v-if="encontrado" :libros= "books"></card>
      </div>
    </div>
  </div>
</template>

<script>
import booksService from '../services/booksService';
import axios from 'axios';
import Card from './card.vue';


const apiKey = '.json?api-key=wMrIxYjKdpTQq76wy7ngPAG1OD0VJy8j'
const url = 'https://api.nytimes.com/svc/books/v3/'
 

export default {
  name: "Books",
  data() {
    return {
      categorias: [],
      categoria: '',
      books: [],
      rBooks: [],
      encontrado: false,
      error: false,
      mensajeError: ''
      }
  },
  components: {

    Card
  },
  methods: {

    validarCategoria() {
      
      this.categoria = document.querySelector("#opcion").value;
      if (this.categoria != ''){
        document.getElementById('name').removeAttribute('disabled')
      }
    },
     async search() {

      let bookName = document.getElementById('name').value;
      let bookRe = new RegExp(bookName, 'i');
      if (bookName.length === 0) {

        return;
      } else {
        
        const response = await axios.get(`${url}lists/current/${this.categoria}${apiKey}`)
        .catch(error => {

          this.mensajeError = error
          return;
        });
        if (response) {
          
          this.rBooks = response.data.results.books;
        }else{
          
          return this.error = true;
        }
        this.books = [];
        this.rBooks.find(book => {

          let bTitle = book.title.search(bookRe);
          if (bTitle != -1) {

            this.books.push(book);
            this.encontrado = true;
          }
        });

        if (this.books.length === 0) {

          this.encontrado = false;
          return;
        }
        

      }
  
    },
    categories() {
      return booksService.methods.getCategorias();

    }
  },
  async mounted() {

    const response = await axios.get(`${url}lists/names${apiKey}`);
    this.categorias = response.data.results
    this.categorias = this.categorias.slice(0,10)
  }
};
</script>

<style scoped lang="scss">
.container1 {
  z-index: 1;
  margin: 36px auto;
  max-width: 826px;
  background-color: white;
}
.texto{
  margin-top: 20px;
  font-size: 25px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif !important;
}

.card1 {
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  padding: 30px;
  
}

.list1 {
  > li {
    &:not(:last-child) {
      margin-bottom: 18px;
    }
    > a {
      color: #0a5b8c;
      display: block;
      margin-bottom: 6px;
    }

    > span {
      color: rgba(#3b4242, 0.7);
      font-size: 12px;
    }
  }
}

.btn {
  color: #fff;
  cursor: pointer;
  background-color: #117a8b;
  border: 1px solid transparent;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.1s ease-in;
  &:hover {
    background-color: #138496;
    border-color: #117a8b;
  }
}

.heading1 {
  margin-bottom: 12px;

  .title1 {
    font-size: 18px;
    font-weight: 600;
  }
}



  .form-control1 {
    

    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ced4da;
    border-radius: 0;
    outline: 0;
    margin-left: 10px;
    box-shadow: none;
    padding: 6px 0;
    width: 60%;
  }
  .form-select{
    
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ced4da;
    border-radius: 0;
    outline: 0;
    box-shadow: none;
    padding: 6px 0;
    width: 30%;
  }


</style>
