import React, { useState, useContext, createContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

function StateContext({ children }) {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQty, setTotalQty] = useState(0);
   const [qty, setQty] = useState(1);

   // Persist cartItems on page refresh
   useEffect(() => {
      const cartData = window.localStorage.getItem('storedCartItems');

      if (cartData) {
         setCartItems(JSON.parse(cartData))
      } else {
         setCartItems([]);
      }
   }, [])

   // Dynamically calculate totalQty & totalPrice based on cartItems
   useEffect(() => {
      localStorage.setItem('storedCartItems', JSON.stringify(cartItems));

      let totalQty = 0;
      let totalPrice = 0;

      if (cartItems.length === 0) return;

      cartItems.forEach(e => {
         totalQty += e.quantity;
         totalPrice += e.price * e.quantity;
      });

      setTotalQty(totalQty);
      setTotalPrice(totalPrice);

   }, [cartItems])


   function addToCart(product, quantity) {
      const checkProductInCart = cartItems.find((item) => item._id === product._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);

      if (checkProductInCart) {
         const updatedCartItems = cartItems.map((cartProduct) => {
            if (cartProduct._id = product._id) {
               return {
                  ...cartProduct,
                  quantity: cartProduct.quantity + quantity
               }
            }
         })

         setCartItems(updatedCartItems);
      } else {
         product.quantity = quantity;

         setCartItems([...cartItems, product]);
      }

      toast.success(`Item successfully added to cart.`);
   }

   // Remove all quantities of product from cart
   function onRemove(item) {
      const updatedCartItems = cartItems.filter((cartItem) => cartItem._id !== item._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price * item.quantity);
      setCartItems(updatedCartItems);
   }

   // CartItem quantity handler
   function toggleCartItemQty(id, value) {
      const foundProduct = cartItems.find((item) => item._id === id);
      const index = cartItems.findIndex((item) => item._id === id);

      let newCartItems = [...cartItems];

      if (value === 'inc') {
         newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 }

         setCartItems(newCartItems);
      } else if (value === 'dec') {
         if (foundProduct.quantity > 1) {
            newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 }

            setCartItems(newCartItems);
         }
      }

   }

   function decQty() {
      setQty((prevQty) => {
         if (prevQty - 1 < 1) return 1;
         return prevQty - 1;
      })
   }

   function incQty() {
      setQty((prevQty) => prevQty + 1)
   }

   function resetQty() {
      setQty(1);
   }

   return (
      <Context.Provider value={{
         showCart,
         setShowCart,
         cartItems,
         setCartItems,
         addToCart,
         qty,
         decQty,
         incQty,
         resetQty,
         totalQty,
         setTotalQty,
         onRemove,
         totalPrice,
         setTotalPrice,
         toggleCartItemQty
      }}>
         {children}
      </Context.Provider>
   );
}

export default StateContext;

export function useStateContext() {
   return useContext(Context);
}

