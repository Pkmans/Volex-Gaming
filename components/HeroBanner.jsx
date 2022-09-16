import React from 'react';

import { scrollTo } from '../lib/utils';

function HeroBanner({ productsRef }) {
   return (
      <div className='hero-banner-container'>
         <div className='hero-banner-content-wrapper'>
            <h1>Best Collection of Gaming Equipment</h1>
            <h5>Volex offers high quality products for fellow gamers.</h5>

            <div className='herobanner-button-div'>
               <button type='button'
                  onClick={() => scrollTo(productsRef)}
               >
                  Shop Now
               </button>
            </div>
         </div>
      </div>
   );
}

export default HeroBanner;