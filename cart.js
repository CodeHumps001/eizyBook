import {
    books,
    cartItem,
} from './main.js';

const cartCounter = document.querySelector('.count-c');
const itemCounter = document.querySelectorAll('.items-count');
let cartContainer = document.querySelector('.cart-main-cont');
const total = document.querySelector('.t-cost');
const alertBox = document.querySelector('.al')
const alertBoxError = document.querySelector('.alE')
const message = document.querySelector('.message')
const completeBtn = document.querySelector('.complete')
const errorMessage = document.querySelector('.error')

//Ading items to cart
export function addToCart(){
    const buttonEl = document.querySelectorAll('.add');
    buttonEl.forEach((btn, i) =>{
        let index = +btn.getAttribute('data-index') + 1;

       btn.addEventListener('click', ()=>{
        const  currentProduct = books.find(book => book.id === index);
        const existing = cartItem.find(book => book.id === index);
        if(existing){
            existing.qyt++
            totalCost()
        }else{
            cartItem.push({...currentProduct, qyt:1});
            console.log(cartItem)
            message.textContent = `${currentProduct.title}`
            
            // increaseQuantity()
            totalCost()
            cartCounter.textContent =  cartItem.length
             itemCounter.forEach(btn =>{
                btn.textContent= cartItem.length
             })
        }
        cartNotification()
        renderCartProduct();
        completeOrder()
        increaseQuantity()
        decreaseQuantity()
        console.log(currentProduct)
       })
    })
   
}

//displaying added product to cart
function renderCartProduct(){
    let cartHTML = ''
    cartItem.forEach((product , i) =>{
        cartHTML += `
            <div class="cart-inner">

                        <div class="cart-table">
                            <div class="image-details">
                                <div class="img">
                                 <img loading="lazy" src="${product.image}" alt="">
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
    increaseQuantity()
    decreaseQuantity()
    
}

//deleteing item from cart
function deleteCartItem(){
    const deleteItem = document.querySelectorAll('.del-btn')

    deleteItem.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const index = btn.getAttribute('delete-set') ;

            cartItem.splice(index,1)
            cartCounter.textContent = itemCounter.textContent = cartItem.length
            renderCartProduct()

            totalCost()
            completeOrder()
             cartCounter.textContent =  cartItem.length
             itemCounter.forEach(btn =>{
                btn.textContent= cartItem.length
             })
        })
    })
}

//calculation for total cost
function totalCost(){
    const findTotal = cartItem.reduce((curr, product) => curr + product.price * product.qyt, 0);
    total.textContent = findTotal;
}


//increasing quantity
function increaseQuantity(){
    const increaseBtn = document.querySelectorAll('.ad')

    increaseBtn.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const index = +btn.getAttribute('add-set');
            
            const getItem = cartItem.find(product => product.id === index);
            
            if(getItem.qyt < getItem.stock){
                getItem.qyt++
                totalCost()
                renderCartProduct()
                
            }else{
                alertBoxError.classList.add('show')
                errorMessage.textContent = `You can't add more than ${getItem.stock} copies `
                setTimeout(()=> alertBoxError.classList.remove('show'), 2000)
                    
            }
        })
    })
}
//Decreasing quantity
function decreaseQuantity(){
    const decreaseBtn = document.querySelectorAll('.sub')

    decreaseBtn.forEach(btn => {
        btn.addEventListener('click', ()=>{
            const index = +btn.getAttribute('sub-set');
            const getItem = cartItem.find(product => product.id === index );
            getItem.qyt > 1 ? getItem.qyt-- : getItem.gyt;
            totalCost()
            renderCartProduct()
        })
    })
}

//updating items in title and alert

function cartNotification(){
    //title logic
    if(cartItem.length > 0){
        document.title = `(${cartItem.length }) - eizyBook`
    }else{
        document.title = `eizyBook`
    }

    //working on alertBox
    alertBox.classList.add('show')
    setTimeout(()=> alertBox.classList.remove('show'), 2000)
}


//disbaling complete order button when there is no Item

function completeOrder(){
    if(cartItem.length === 0){
        completeBtn.setAttribute('disabled' , 'true')
        completeBtn.classList.add('disabled')
    }else{
        completeBtn.removeAttribute('disabled')
        completeBtn.classList.remove('disabled')
    }
}
