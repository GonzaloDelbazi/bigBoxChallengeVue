<template>
  <div class="row justify-content-center">

    <div class="card m-3 col-3" v-for="book in this.libros" :key="book.id" @click="buscarGoogle(book.title, book.author)" >
        <div class="card-body">
            <img class="card-img-top" v-bind:src="book.book_image" v-bind:alt="book.book_image">
            <h2 class="card-title">{{book.title}}</h2>
            <h3 class="card-text">{{book.author}}</h3>
            <hr>
            <p class="card-text">{{book.description}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'card',
    props: ['libros'],
    methods: {
        buscarGoogle(title, author) {

            title = this.fixWord(title);
            author = this.fixWord(author);
            window.location = `https://www.google.com/search?q=${title}+${author}`
        },
        fixWord(word) {
        
        return word.replace(/[  ]/g, '+');
        
        }
    }
}
</script>

<style>
.card {
    cursor: pointer !important;
    
}

hr {
    border-top: 1px solid black  !important;
}
img{
    border: 2px solid black !important;
}
h2{
    margin-top: 5px !important;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif !important;

}
h3{
    margin-top: 15px !important;
    font-size: 15px !important;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif !important;
}
p{
    font-size: 12px !important;
}

</style>