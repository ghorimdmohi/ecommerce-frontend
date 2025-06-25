function renderCart(){const cart=getCart();const container=document.getElementById('cart-items');container.innerHTML='';let subtotal=0;if(cart.length===0){container.innerHTML='<p>Your cart is empty.</p>';document.getElementById('subtotal').textContent='0.00';document.getElementById('total').textContent='0.00';return}
cart.forEach(item=>{subtotal+=item.price*item.quantity;const itemEl=document.createElement('div');itemEl.className='cart-item';itemEl.innerHTML=`
      <div>
        <h3>${item.title}</h3>
        <p>$${item.price.toFixed(2)}</p>
      </div>
      <div>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="qty-input" />
        <button data-id="${item.id}" class="remove-btn">Remove</button>
      </div>
    `;container.appendChild(itemEl)});document.getElementById('subtotal').textContent=subtotal.toFixed(2);document.getElementById('total').textContent=subtotal.toFixed(2);attachCartEvents()}
function attachCartEvents(){const qtyInputs=document.querySelectorAll('.qty-input');const removeButtons=document.querySelectorAll('.remove-btn');qtyInputs.forEach(input=>{input.addEventListener('change',e=>{const id=parseInt(e.target.dataset.id);const qty=parseInt(e.target.value);updateCartQuantity(id,qty);renderCart()})});removeButtons.forEach(btn=>{btn.addEventListener('click',e=>{const id=parseInt(e.target.dataset.id);removeFromCart(id);renderCart()})})}
function updateCartQuantity(id,newQty){let cart=getCart();cart=cart.map(item=>{if(item.id===id){return{...item,quantity:newQty}}
return item});saveCart(cart);updateCartCount()}
function removeFromCart(id){let cart=getCart();cart=cart.filter(item=>item.id!==id);saveCart(cart);updateCartCount()}
document.addEventListener('DOMContentLoaded',renderCart)