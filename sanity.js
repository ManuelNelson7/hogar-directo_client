import { createClient, createImageUrlBuilder } from "next-sanity"

const config = {

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: "ekdlavlv",
  useCdn: process.env.NODE_ENV === "production",

}

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)