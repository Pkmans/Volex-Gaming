import React, { useState, useEffect } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';
import getStripe from '../../lib/getStripe';
import toast from 'react-hot-toast';

function ProductDetails({ product, products }) {
   const { image, name, details, price } = product;
   const [index, setIndex] = useState(0);

   const { qty, decQty, incQty, resetQty, addToCart } = useStateContext();

   // Reset Quantity to 1 when viewing another product
   useEffect(() => {
      resetQty();
   }, [product])

   async function buyNow() {
      const stripe = await getStripe();

      product.quantity = qty;

      // api call, passing it cart items
      const response = await fetch('/api/stripe', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify([product])
      })

      const data = await response.json();

      toast.loading('Redirecting to checkout...');
      stripe.redirectToCheckout({ sessionId: data.id });
   }

   return (
      <div className='products-box'>
         <div className='product-detail-container'>
            <div className='product-images-box horizontal-center'>
               <div className='image-wrapper horizontal-center'>
                  <div className='image-container'>
                     <img
                        src={urlFor(image && image[index])}
                        className='product-detail-image image-fit vertical-center horizontal-center'
                     />
                  </div>
               </div>

               <div className='small-images-box'>
                  {image?.map((item, i) => (
                     <div
                        key={i}
                        className={i === index ? 'small-image-wrapper selected-image' : 'small-image-wrapper'}
                        onClick={() => setIndex(i)}
                     >
                        <div className='image-container'>
                           <img
                              src={urlFor(item)}
                              className='small-image image-fit vertical-center horizontal-center'
                           />
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className='product-detail-desc'>
               <h1>{name}</h1>
               <div className='reviews'>
                  <div>
                     <AiFillStar />
                     <AiFillStar />
                     <AiFillStar />
                     <AiFillStar />
                     <AiOutlineStar />
                  </div>
                  <p>(20)</p>
               </div>

               <h4>Details:</h4>
               <p>{details}</p>
               <p className='price'>${price}</p>
               <div className='quantity'>
                  <h3>Quantity: </h3>
                  <p className='quantity-desc'>
                     <span className='minus' onClick={() => decQty()}>
                        <AiOutlineMinus />
                     </span>
                     <span className='num'>{qty}</span>
                     <span className='plus' onClick={() => incQty()}>
                        <AiOutlinePlus />
                     </span>
                  </p>
               </div>

               <div className='buttons'>
                  <button type='button'
                     className='add-to-cart'
                     onClick={() => addToCart(product, qty)}
                  >
                     Add to Cart
                  </button>
                  <button type='button' className='buy-now' onClick={buyNow}>
                     Buy Now
                  </button>
               </div>
            </div>
         </div>

         <div className='similar-products-wrapper'>
            <h2>Similar Products</h2>
            <div className='marquee'>
               <div className='similar-products-container'>
                  {products.map((product) => (
                     <Product key={product._id} product={product} />
                  ))}
               </div>
            </div>
         </div>

      </div>
   );
}

export async function getStaticPaths() {
   const query = `*[_type == "product"] {
      slug {
         current
      }
   }`;
   const products = await client.fetch(query);

   const paths = products.map((product) => ({
      params: {
         slug: product.slug.current
      }
   }))

   return {
      paths,
      fallback: 'blocking'
   };
}

export async function getStaticProps({ params: { slug } }) {
   // SanityClient Query & Fetch

   const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
   const product = await client.fetch(productQuery);

   const productsQuery = `*[_type == "product" && product_type == "${product.product_type}" && _id != "${product._id}"]`;
   const products = await client.fetch(productsQuery);

   return {
      props: { product, products } // will be passed to the page component as props
   }
}

export default ProductDetails;