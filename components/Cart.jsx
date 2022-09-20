import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { useWindowSize } from '../lib/utils.js';

function Cart() {
   const cartRef = useRef();
   const { totalPrice, totalQty, cartItems, setShowCart, toggleCartItemQty, onRemove } = useStateContext();
   const { width } = useWindowSize();

   async function handleCheckout() {
      const stripe = await getStripe();

      // api call, passing it cart items
      const response = await fetch('/api/stripe', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(cartItems)
      })

      const data = await response.json();

      toast.loading('Redirecting to checkout...');
      stripe.redirectToCheckout({ sessionId: data.id });
   }

   // Close Cart if clicked anywhere outside
   function handleClick(e) {
      if (e.currentTarget != e.target) return;
      setShowCart(false);
   }

   return (
      <div className='cart-wrapper' ref={cartRef} onClick={handleClick}>
         <div className="cart-container">
            <button
               type="button"
               className="cart-heading"
               onClick={() => setShowCart(false)}>
               <AiOutlineLeft />
               <div className="heading">Your Cart</div>
               <div className="cart-num-items">({totalQty} items)</div>
            </button>

            {cartItems.length < 1 && (
               <div className='empty-cart'>
                  <AiOutlineShopping size={width > 655 ? 150 : 100} />
                  <h3>Your shopping cart is empty.</h3>
                  <button type='button' className='btn' onClick={() => setShowCart(false)}>
                     Continue Shopping
                  </button>

               </div>
            )}

            <div className='cart-product-container'>
               {cartItems.length >= 1 && cartItems.map((item) => (
                  <div className='cart-product' key={item._id}>
                     <div className='image-wrapper'>
                        <div className='image-container'>
                           <img src={urlFor(item.image[0])} className='cart-product-image image-fit vertical-center horizontal-center' />
                        </div>
                     </div>
                     <div className='item-desc'>
                        <div className='flex top'>
                           <h5>{item.name}</h5>
                        </div>

                        <div className='flex bottom'>
                           <div>
                              <p className='quantity-desc'>
                                 <div className='minus' onClick={() => toggleCartItemQty(item._id, 'dec')}>
                                    <AiOutlineMinus />
                                 </div>
                                 <div className='num'>{item.quantity}</div>
                                 <div className='plus' onClick={() => toggleCartItemQty(item._id, 'inc')}>
                                    <AiOutlinePlus />
                                 </div>
                              </p>
                           </div>
                           <h4>${item.price}</h4>

                           <button
                              type='button'
                              className='remove-item'
                              onClick={() => onRemove(item)}
                           >
                              <TiDeleteOutline />
                           </button>
                        </div>
                     </div>
                  </div>

               ))}
            </div>

            {cartItems.length >= 1 && (

               <div className='cart-bottom'>
                  <div className='bottom-container'>
                     <div className='total'>
                        <h3>Subtotal: </h3>
                        <h3>${(Math.round(totalPrice * 100) / 100).toFixed(2)}</h3>
                     </div>
                     <div className='btn-container'>
                        <button type='button' className='btn' onClick={handleCheckout}>
                           Pay with Stripe
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}

export default Cart;