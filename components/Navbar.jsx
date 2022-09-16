import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaCubes } from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

function Navbar() {
   const { showCart, setShowCart, totalQty } = useStateContext();
   const { data: session } = useSession(); // Session === true: user is signed in

   return (
      <div className='navbar-container'>
         <div className='navbar-left'>
            <FaCubes size={30} />
            <p className='logo'>
               <Link href='/'>VOLEX GAMING</Link>
            </p>
         </div>

         <div className='navbar-categories'>
            <Link href='/'>Home</Link>
            <Link href='/categories/Headsets'>Headsets</Link>
            <Link href='/categories/Mice'>Mice</Link>
            <Link href='/categories/Mousepads'>Mousepads</Link>
            <Link href='/categories/Keyboards'>Keyboards</Link>
         </div>

         <div className='navbar-right'>
            {!session ?
               <button type='button' className='login-button' onClick={() => signIn()}>Sign In</button>
               :
               <button type='button' className='login-button' onClick={() => signOut()}>Sign Out</button>
            }

            <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
               <AiOutlineShopping size={30} />
               <span className='cart-item-qty'>{totalQty}</span>
            </button>
         </div>


         {showCart && <Cart />}
      </div>
   );
}

export default Navbar;