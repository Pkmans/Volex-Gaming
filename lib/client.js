// Sanity Client
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
   projectId: '43iv1y2w',
   dataset: 'production',
   apiVersion: '2021-09-08',
   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
   useCdn: true,
})

const builder = imageUrlBuilder(client);

export function urlFor(source) {
   return builder.image(source);
}

