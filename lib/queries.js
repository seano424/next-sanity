import { getClient } from '../lib/sanity.server'

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current
  }
`
export const pageBySlugQuery = `
  *[_type == "page" && slug.current == $slug][0] {
    "slug": slug.current
  }
`
export async function getArticles(preview) {
  const results = await getClient(preview).fetch(`*[_type == "article"]`)
  return results
}

export async function getPages(preview) {
  const results = await getClient(preview).fetch(`*[_type == "page"]`)
  return results
}

export async function getAllPageSlugs() {
  const allSlugsQuery = `*[_type == "page"][].slug.current`
  const pages = await getClient().fetch(allSlugsQuery)
  return pages
}

export async function getPage(params, preview) {
  const query = `*[_type == "page" && slug.current == $slug]`
  const queryParams = { slug: params?.slug }
  const data = await getClient(preview).fetch(query, queryParams)
  return data
}
