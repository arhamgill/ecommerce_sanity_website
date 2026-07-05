
import { defineLive } from "next-sanity";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN")
}

export const { sanityFetch, SanityLive } = defineLive({ 
  // Cast to any to bypass SanityClient type conflict between the root
  // @sanity/client and the version bundled inside next-sanity's loader.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: client as any,
  serverToken: token,
  browserToken: token,
});
