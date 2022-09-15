import React, { useState, useContext, createContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

// let storedTotalQty = 0;

function StateContext({ children }) {
   const [showCart, setShowCart] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [totalPrice, setTotalPrice] = useState(0);
   const [totalQty, setTotalQty] = useState(0);
   const [qty, setQty] = useState(1);

   let foundProduct;
   let index;

   // useEffect(() => {
   //    storedTotalQty = localStorage.getItem('totalQty') ? localStorage.getItem('totalQty') : 0;
   // }, [])

   // useEffect(() => {
   //    localStorage.setItem('storedTotalQty', `${totalQty}`);
   // }, [totalQty])

   function decQty() {
      setQty((prevQty) => {
         if (prevQty - 1 < 1) return 1;
         return prevQty - 1;
      })
   }

   function incQty() {
      setQty((prevQty) => prevQty + 1)
   }

   function addToCart(product, quantity) {
      const checkProductInCart = cartItems.find((item) => item._id === product._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
      setTotalQty((prevTotalQty) => prevTotalQty + quantity);

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

   function onRemove(item) {
      const updatedCartItems = cartItems.filter((cartItem) => cartItem._id !== item._id);

      setTotalPrice((prevTotalPrice) => prevTotalPrice - item.price * item.quantity);
      setTotalQty((prevTotalQty) => prevTotalQty - item.quantity);
      setCartItems(updatedCartItems);
   }

   function toggleCartItemQty(id, value) {
      foundProduct = cartItems.find((item) => item._id === id);
      index = cartItems.findIndex((item) => item._id === id);
      let newCartItems = cartItems;

      if (value === 'inc') {
         newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 }

         setCartItems(newCartItems);
         setTotalQty((prevTotalQty) => prevTotalQty + 1)
         setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      } else if (value === 'dec') {
         if (foundProduct.quantity > 1) {
            newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 }

            setCartItems(newCartItems);
            setTotalQty((prevTotalQty) => prevTotalQty - 1)
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
         }
      }
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

