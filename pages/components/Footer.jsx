import React from 'react';

import {AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai'

function Footer() {
   return (
      <div className='footer-container'>
         <p>© 2022 ALGS All Rights Reserved</p>
         <div className='icons'>
            <AiFillInstagram />
            <AiOutlineTwitter />
         </div>
      </div>
   );
}

export default Footer;