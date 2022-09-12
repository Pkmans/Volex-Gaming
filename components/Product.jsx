import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

function Product({ product: { image, name, slug, price } }) {
   return (
      <div>
         <div className='product-card'>
            <Link href={`/products/${slug.current}`}>
               <img src={urlFor(image && image[0])} 
               className='product-image' 
               width={250}
               height={250}
               />
            </Link>
         </div>
         <h4 className='product-name'>{name}</h4>
         <p className='product-price'>${price}</p>
      </div>
   );
}

export default Product;