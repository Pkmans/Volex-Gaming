import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

function Navbar() {
   const { showCart, setShowCart, totalQty } = useStateContext();

   return (
      <div className='navbar-container'>
         <div className='navbar-left'>
            <p className='logo'>
               <Link href='/'>
                  VOLEX GAMING
               </Link>
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
            <button type='button'
               className='cart-icon'
               onClick={() => setShowCart(true)}
            >
               <AiOutlineShopping size={30} />
               <span className='cart-item-qty'>{totalQty}</span>
            </button>
         </div>


         {showCart && <Cart />}
      </div>
   );
}

export default Navbar;