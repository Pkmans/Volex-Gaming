import React from 'react';

function FooterBanner() {
   return (
      <div className='footer-banner-container banner'>
         <div className='vertical-center horizontal-center'>
            <h1>Didn&apos;t find anything you like? </h1>
            <h5>Send us an email of a product you would like and we&apos;ll do our best to offer it in our store!</h5>

            <div className='footer-button-div'>
               <a href='mailto:aaronlam2k@gmail.com' target='_blank' rel="noreferrer">
                  <button type='button'>Email us</button>
               </a>
            </div>
         </div>
      </div>
   );
}

export default FooterBanner;