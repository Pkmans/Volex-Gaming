import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { startConfetti } from '../lib/utils';


function Success() {
   const { setCartItems, setTotalPrice, setTotalQty } = useStateContext();

   // Reset States back to default after purchase
   useEffect(() => {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQty(0);
      startConfetti();
   }, []);

   return (
      <div className="success-wrapper">
         <div className="success">
            <p className="icon">
               <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">Check your email inbox for the receipt.</p>
            <p className="description">
               If you have any questions, please email
               <a className="email" href="mailto:aaronlam2k@gmail.com">
                  aaronlam2k@gmail.com
               </a>
            </p>
            <Link href="/">
               <button type="button" width="300px" className="btn">
                  Back to Shop
               </button>
            </Link>
         </div>
      </div>
   );
}

export default Success;