import { getClient } from '../lib/sanity.server'

export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current
  }
`
export async function getArticles(preview) {
  const results = await getClient(preview).fetch(`*[_type == "article"]`)
  return results
}
