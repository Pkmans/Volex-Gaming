import React from 'react';

import {AiFillInstagram, AiOutlineTwitter, AiFillFacebook} from 'react-icons/ai'

function Footer() {
   return (
      <div className='footer-container'>
         <p>© 2022 Volex Gaming All Rights Reserved</p>
         <div className='icons'>
            <AiFillInstagram />
            <AiOutlineTwitter />
            <AiFillFacebook />
         </div>
      </div>
   );
}

export default Footer;