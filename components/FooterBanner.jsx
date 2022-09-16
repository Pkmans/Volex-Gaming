import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client'

function FooterBanner({ footerBanner: { discount, largeText1, largeText2, saleTime,
   smallText, midText, product, buttonText, image, desc } }) {
   return (
      <div className='footer-banner-container'>
         <div className='footer-banner-content-wrapper'>
            <h1>Didn't find anything you like? </h1>
            <h5>Send us an email of a product you would like and we'll do our best to offer it in our store!</h5>

            <div className='footer-button-div'>
               <a href='mailto:aaronlam2k@gmail.com' target='_blank'>
                  <button type='button'>Email us</button>
               </a>

            </div>
         </div>
      </div>
   );
}

export default FooterBanner;