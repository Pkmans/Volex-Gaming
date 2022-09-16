import React from 'react';
import { Product } from '../../components';
import { client } from '../../lib/client';

function ProductCategory({ products }) {
   return (
      <div className='products-box'>
         <h1 className='products-heading'>{products[0].product_type}</h1>
         <div className='products-container' id='products'>
            {products?.map((product) => (
               <Product key={product._id} product={product} />
            ))}
         </div>
      </div>
   );
}

export async function getStaticPaths() {
   const query = `*[_type == "product"] {
      product_type
   }`;
   const products = await client.fetch(query);

   const paths = products.map((product) => ({
      params: {
         category: product.product_type
      }
   }))

   return {
      paths,
      fallback: false
   };
}

export async function getStaticProps({ params: { category } }) {
   // SanityClient Query & Fetch

   const productsQuery = `*[_type == "product" && product_type == "${category}"]`;
   const products = await client.fetch(productsQuery);

   return {
      props: { products } // will be passed to the page component as props
   }
}

export default ProductCategory;