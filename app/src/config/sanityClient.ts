import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const sanityClient = createClient({
    projectId: 'c6ge8x6u',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21'
})

export default sanityClient

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source : SanityImageSource) {
  return builder.image(source)
}