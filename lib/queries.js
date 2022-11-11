export const articleBySlugQuery = `
  *[_type == "article" && slug.current == $slug][0] {
    "slug": slug.current
  }
`
