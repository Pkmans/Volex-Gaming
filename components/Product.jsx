import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

function Product({ product: { image, name, slug, price } }) {
   return (
      <div className='product-card'>
         <div className='product-image-wrapper'>
            <div className='image-container'>
               <Link href={`/products/${slug.current}`}>
                  <img src={urlFor(image && image[0])}
                     className='product-image'
                  // width={300}
                  // height={300}
                  />
               </Link>
            </div>
         </div>


         <div className='details'>
            <h4 className='product-name'>{name}</h4>
            <p className='product-price'>${price}</p>
         </div>
      </div>
   );
}

export default Product;