import React, { useRef } from 'react';

import { client } from '../lib/client';
import { FooterBanner, HeroBanner, Product } from '../components';

export default function Home({ products }) {
  const productSection = useRef(null);

  return (
    <div>
      <HeroBanner productsRef={productSection} />

      <div className='products-box' ref={productSection}>
        <div className='products-heading'>
          <h2>Best Seller Products</h2>
          <p>These are our customers&apos; most bought products</p>
        </div>

        <div className='products-container'>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>

        
      </div>


      <FooterBanner />
    </div>
  )
}

export async function getServerSideProps() {
  // SanityClient Query & Fetch

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  return {
    props: { products } // will be passed to the page component as props
  }
}