import {addToCart} from './cart.js';




 export const books = [
  { id: 1, title: "Eloquent JavaScript",   author: "Marijn Haverbeke", price: 25, stock: 20, genre: "Programming" , image: './images/js.jpg'},
  { id: 2, title: "Clean Code",            author: "Robert C. Martin", price: 30, stock: 15, genre: "Programming" , image: './images/clean-code.jpg' },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt",  price: 28, stock: 18, genre: "Programming" , image: './images/pragma.jpg' },
  { id: 4, title: "Atomic Habits",         author: "James Clear",     price: 22, stock: 25, genre: "Self-help" , image: './images/atom.jpg' },
  { id: 5, title: "Deep Work",             author: "Cal Newport",     price: 24, stock: 10, genre: "Self-help" , image: './images/dp.jpg'},
  { id: 6, title: "You Don’t Know JS",     author: "Kyle Simpson",    price: 26, stock: 12, genre: "Programming" , image: './images/ks.jpg'},
  { id: 7, title: "The Alchemist",         author: "Paulo Coelho",    price: 18, stock: 30, genre: "Fiction"  , image: './images/ta.jpg'},
  { id: 8, title: "1984",                  author: "George Orwell",   price: 20, stock: 22, genre: "Fiction"  , image: './images/1984.jpg'},
  { id: 9, title: "Rich Dad Poor Dad",     author: "Robert Kiyosaki", price: 19, stock: 28, genre: "Finance"  , image: './images/rdp.png'},
  { id: 10,title: "Can’t Hurt Me",         author: "David Goggins",   price: 27, stock: 16, genre: "Memoir" , image: './images/ch.jpg' }
];

export let cartItem = []

//selected elements
const cartIcon = document.querySelector('.cart-i');
let productContainer = document.querySelector('.p-c')
const exitModal = document.querySelector('.shop')
const modal = document.querySelector('.modal-d')
const alertBox = document.querySelector('.al')
const filterInput = document.querySelector('.filter-input')


//cart toggle

alertBox.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
    modal.classList.toggle('active')
})
cartIcon.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
    modal.classList.toggle('active')
})
exitModal.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
    modal.classList.toggle('active')
})

//display all books
function renderProducts(books){
    
    let cardHTML = ''
    books.forEach((book, i) =>{

        cardHTML += `
                <div class="product-card">
                        <div class="img-product">
                        <img src="${book.image}" alt="">
                        </div>
                        <div class="product-details">
                            <h1 class="title product-name">${book.title}</h1>
                            <h3 class="author product-author">${book.author}</h3>
                            <p class="price product-price">Price: $${book.price}</p>
                            <p class="stock product-stock">${book.stock} pieces </p>
                            <button class="add-cart add" data-index="${i}">Add To CArt</button>
                        </div>
                    </div>
                `
    })
    productContainer.innerHTML = cardHTML;
    addToCart();
}

renderProducts(books)


filterInput.addEventListener('input', filterProduct)
function filterProduct(){
    let filtered = books
    const filterText = filterInput.value.trim().toLowerCase();
    console.log(filterText)

    if(filterText){
        filtered = filtered.filter(product => product.title.toLowerCase().includes(filterText) ||
        product.author.toLocaleLowerCase().includes(filterText)
                                    )
    }
    renderProducts(filtered)
   
}
