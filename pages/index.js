import React from 'react';

import { client } from '../lib/client';
import { FooterBanner, HeroBanner, Product } from './components';

export default function Home({ products, banner }) {

  return (
    <div>
      <HeroBanner heroBanner={banner && banner[0]} />

      <div className='products-heading'>
        <h2>Best Seller Products</h2>
        <p>Electronics of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map((product) => (
          <Product key={product._id} product={product}/>
        ))}
      </div>

      <FooterBanner footerBanner={banner && banner[0]}/>
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