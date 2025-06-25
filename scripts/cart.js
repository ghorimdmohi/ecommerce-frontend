function getCart(){return JSON.parse(localStorage.getItem('cart'))||[]}
function saveCart(cart){localStorage.setItem('cart',JSON.stringify(cart))}
function addToCart(product){const cart=getCart();const existing=cart.find(item=>item.id===product.id);if(existing){existing.quantity+=1}else{cart.push({id:product.id,title:product.title,price:product.price,quantity:1})}
saveCart(cart);updateCartCount()}
function updateCartCount(){const cart=getCart();const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0);const countEl=document.querySelector('.cart-count');if(countEl){countEl.textContent=totalItems}}
document.addEventListener('DOMContentLoaded',updateCartCount);document.addEventListener("DOMContentLoaded",()=>{const cartItemsEl=document.getElementById("cart-items");const totalEl=document.getElementById("cart-total");const checkoutBtn=document.getElementById("checkout-btn");let cart=JSON.parse(localStorage.getItem("cart"))||[];function renderCart(){cartItemsEl.innerHTML="";if(cart.length===0){cartItemsEl.innerHTML="<p>Your cart is empty.</p>";checkoutBtn.disabled=!0;totalEl.textContent="0.00";return}
checkoutBtn.disabled=!1;cart.forEach((item,index)=>{const itemEl=document.createElement("div");itemEl.className="cart-item";itemEl.innerHTML=`
        <img src="https://fakestoreapi.com/img/${item.id}.jpg" alt="${item.title}" />
        <div class="cart-details">
          <h4>${item.title}</h4>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Size: ${item.size || "Default"}</p>
        </div>
        <div class="cart-controls">
          <button onclick="updateQty(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">🗑</button>
        </div>
      `;cartItemsEl.appendChild(itemEl)});updateTotal()}
window.updateQty=function(index,change){const qty=cart[index].quantity+change;if(qty<1)return;cart[index].quantity=qty;saveCart();renderCart()};window.removeItem=function(index){cart.splice(index,1);saveCart();renderCart()};function updateTotal(){const total=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);totalEl.textContent=total.toFixed(2)}
function saveCart(){localStorage.setItem("cart",JSON.stringify(cart));updateCartCount()}
function updateCartCount(){const totalItems=cart.reduce((sum,item)=>sum+item.quantity,0);const cartCount=document.querySelector('.cart-count');if(cartCount){cartCount.textContent=totalItems}}
checkoutBtn.addEventListener("click",()=>{alert("Proceeding to checkout...");window.location.href="checkout.html"});renderCart()})