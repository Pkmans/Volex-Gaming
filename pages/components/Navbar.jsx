import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

function Navbar(props) {
   return (
      <div className='navbar-container'>
         <p className='logo'>
            <Link href='/'>
               AL Gaming Store
            </Link>
         </p>
         <button type='button' className='cart-icon'>
            <AiOutlineShopping />
            <span className='cart-item-qty'>1</span>
         </button>
      </div>
   );
}

export default Navbar;