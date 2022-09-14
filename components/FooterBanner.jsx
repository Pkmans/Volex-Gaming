import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client'

function FooterBanner({ footerBanner: { discount, largeText1, largeText2, saleTime,
   smallText, midText, product, buttonText, image, desc } }) {
   return (
      <div className='footer-banner-container'>
         <div className='banner-desc'>
            <div className='left'>
               <p>{discount}</p>
               <h3>{largeText1}</h3>
               <h3>{largeText2}</h3>
               <p>{saleTime}</p>
            </div>
            <div className='right'>
               <p>{smallText}</p>
               <h3>{midText}</h3>
               <p>{desc}</p>
               <Link href={`/products/${product}`}>
                  <button type='button'>{buttonText}</button>
               </Link>
            </div>
            <img
               src={urlFor(image && image)}
               className='footer-banner-image'
               width={325}
               height={325}
            />
         </div>
      </div>
   );
}

export default FooterBanner;