const books = [
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


//selected elements

const cartIcon = document.querySelector('.cart-i');
const cartCounter = document.querySelector('.count-c')
const itemCounter = document.querySelectorAll('.items-count')
let productContainer = document.querySelector('.p-c')
const exitModal = document.querySelector('.shop')
let cartContainer = document.querySelector('.cart-main-cont') 
const modal = document.querySelector('.modal-d')
const total = document.querySelector('.t-cost');


cartIcon.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
    modal.classList.toggle('active')
})
exitModal.addEventListener('click', ()=>{
    modal.classList.toggle('hidden')
    modal.classList.toggle('active')
})

//display all books

const renderProducts = function(books){
    
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


//working on add to cart button

let cartItem = []
function addToCart(){
    const buttonEl = document.querySelectorAll('.add');
    buttonEl.forEach((btn, i) =>{
        let index = +btn.getAttribute('data-index') + 1;

       btn.addEventListener('click', ()=>{
        const  currentProduct = books.find(book => book.id === index);
        const existing = cartItem.find(book => book.id === index);
        if(existing){
            existing.qyt++
            console.log(cartItem)
        }else{
            cartItem.push({...currentProduct, qyt:1});
            console.log(cartItem)
            
            // increaseQuantity()
            totalCost()
            cartCounter.textContent =  cartItem.length
             itemCounter.forEach(btn =>{
                btn.textContent= cartItem.length
             })
        }
        renderCartProduct();
        console.log(currentProduct)
       })
    })
   
}

//displaying added Items into cart container
 
function renderCartProduct(){

    let cartHTML = ''

    cartItem.forEach((product , i) =>{
        cartHTML += `

            <div class="cart-inner">

                        <div class="cart-table">
                            <div class="image-details">
                                <div class="img">
                                 <img src="${product.image}" alt="">
                                </div>
                                <div class="tite-author">
                                    <p>${product.author}</p>
                                    <h2>${product.title}</h2>
                                </div>
                            </div>
                        </div>
    
    
                        <div class="actions">
                            <button class="subtraction sub" sub-set="${product.id}">-</button>
                            <span class="quantity-counter">${product.qyt}</span>
                            <button class="addition ad" add-set="${product.id}">+</button>
                        </div>
    
                        <div class="cart-price">
                            <p>$ ${product.price}</p>
                        </div>
    
                        <div class="crud">
                            <button class="delete del-btn" delete-set="${i}">x</button>
                        </div>
             </div>
        
        ` 
    });
    cartContainer.innerHTML = cartHTML;
    deleteCartItem()
  
}


//deleteing item from cart

function deleteCartItem(){
    const deleteItem = document.querySelectorAll('.del-btn')

    deleteItem.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const index = btn.getAttribute('delete-set') ;
            // console.log('You are deleting item at position' + index)

            cartItem.splice(index,1)
             cartCounter.textContent = itemCounter.textContent = cartItem.length
            renderCartProduct()

            totalCost()
             cartCounter.textContent =  cartItem.length
             itemCounter.forEach(btn =>{
                btn.textContent= cartItem.length
             })
        })
    })
}


//calculation for total cost
function totalCost(){
    const findTotal = cartItem.flatMap(product => product.price).reduce((curr, pri) => curr + pri, 0);
    total.textContent = findTotal;
}

// //add cart item quantity

// function increaseQuantity(){
//     const addQuantity = document.querySelectorAll('.ad');
//     addQuantity.forEach(add => {
//         add.addEventListener('click', ()=>{
//             const index = Number(add.getAttribute('add-set'));
//             console.log('you click ad at index ', index)
//            const increase = cartItem.filter(item => item.id === index ).map(item => item.price).reduce((curr,pr) => curr + pr,0)
//            console.log(increase)
//             // renderCartProduct()
//             totalCost()
//             totalC.push(increase)
//             totalCost()
//         })
        
//     })
// }

// function decreaseQuantity(){
//     const decreaseQuantity = document.querySelectorAll('.sub');
//     decreaseQuantity.forEach((btn , i) => {
//         btn.addEventListener('click', ()=>{
//              const index = Number(btn.getAttribute('sub-set'));
//             console.log('you click ad at index ', index)
//            const decrease = cartItem.filter(item => item.id === index ).map(item => item.price).reduce((curr,pr) => curr + pr,0)
//            const find = loc

//         })
//     })
// }