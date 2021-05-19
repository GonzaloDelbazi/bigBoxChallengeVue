import axios from "axios";
import Axios from 'axios-observable'

const apiKey = '.json?api-key=wMrIxYjKdpTQq76wy7ngPAG1OD0VJy8j'
const url = 'https://api.nytimes.com/svc/books/v3/'

export default {

    name: 'bookService',
    data() {
        return {

        }
    },
    methods: {

        getCategorias() {
            return axios.get(`${url}lists/names${apiKey}`)
                .then(info => info.data.results);

        },
        cleanWord(word) {

            word.trim();
            return word.toLowerCase().replace(/[!.,  ]/g, '-');
        },
        getBookByTitle(title, categoria) {

            categoria = this.cleanWord(categoria);
            return axios.get(`${this.url}lists/current/${categoria}${this.apiKey}`)
                .pipe(
                    map(info => info.results),
                    map(results => results.books)
                );
        }
    },

}