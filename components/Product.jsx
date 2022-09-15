import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

function Product({ product: { image, name, slug, price } }) {
   return (
      <Link href={`/products/${slug.current}`}>
         <div className='product-card'>
            <div className='image-wrapper'>
               <div className='image-container'>
                  <img src={urlFor(image && image[0])}
                     className='product-image image-fit'
                  />
               </div>
            </div>


            <div className='details'>
               <h4 className='product-name'>{name}</h4>
               <p className='product-price'>${price}</p>
            </div>
         </div>
      </Link>
   );
}

export default Product;