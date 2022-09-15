import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
   if (req.method === 'POST') {
      const params = {
         submit_type: 'pay',
         mode: 'payment',
         payment_method_types: ['card'],
         billing_address_collection: 'auto',
         shipping_options: [
            { shipping_rate: 'shr_1LiMQzD9HC8B9KWB614AM8NK' }, //Free Shipping
            { shipping_rate: 'shr_1LiMQ8D9HC8B9KWBqgjmbI0F' }, //Express Shipping
            { shipping_rate: 'shr_1LiMQiD9HC8B9KWBXbyBQMkO' }, //Fast Shipping
         ],
         line_items: req.body.map((item) => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/43iv1y2w/production/')
               .replace('-webp', '.webp')
               .replace('-jpg', '.jpg')
               .replace('-png', '.png');

            return {
               price_data: {
                  currency: 'cad',
                  product_data: {
                     name: item.name,
                     images: [newImage],
                  },
                  unit_amount: item.price * 100,
               },
               adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
               },
               quantity: item.quantity
            }
         }),
         mode: 'payment',
         success_url: `${req.headers.origin}/success`,
         cancel_url: `${req.headers.origin}/`,
      }

      try {
         // Create Checkout Sessions from body params.
         const session = await stripe.checkout.sessions.create(params);
         res.status(200).json(session);
      } catch (err) {
         res.status(err.statusCode || 500).json(err.message);
      }
   } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
   }
}