import React, { useRef } from 'react';

import { client } from '../lib/client';
import { FooterBanner, HeroBanner, Product } from '../components';

export default function Home({ products, banner }) {
  const productSection = useRef(null);

  return (
    <div>
      <HeroBanner productsRef={productSection} />

      <div className='products-box' ref={productSection}>
        <div className='products-heading'>
          <h2>Best Seller Products</h2>
          <p>These are our customers' most bought products</p>
        </div>

        <div className='products-container' id='products'>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>


      <FooterBanner footerBanner={banner && banner[0]} />
    </div>
  )
}

export async function getServerSideProps() {
  // SanityClient Query & Fetch

  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const bannerQuery = '*[_type == "banner"]';
  const banner = await client.fetch(bannerQuery);

  return {
    props: { products, banner } // will be passed to the page component as props
  }
}