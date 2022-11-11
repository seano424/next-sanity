import { groq } from 'next-sanity'
import { usePreviewSubscription } from '../../lib/sanity'
import { getClient } from '../../lib/sanity.server'
import { GetStaticProps, GetStaticPaths } from 'next/types'
import { ArticleData } from '../../lib/interfaces'
import { filterDataToSingleItem } from '../../lib/helpers'
import Link from 'next/link'

export const getStaticPaths: GetStaticPaths = async () => {
  // *[defined(slug.current)][].slug.current
  const allSlugsQuery = groq`*[_type == "article"][].slug.current`
  const pages = await getClient().fetch(allSlugsQuery)

  return {
    paths: pages.map((slug: string) => `/blog/${slug}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const query = groq`*[_type == "article" && slug.current == $slug]`
  const queryParams = { slug: params?.slug }
  const data = await getClient(preview).fetch(query, queryParams)

  // Escape hatch, if our query failed to return data
  if (!data) return { notFound: true }

  // Helper function to reduce all returned documents down to just one
  const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      // Pass down the "preview mode" boolean to the client-side
      preview,
      // Pass down the initial content, and our query
      data: { page, query, queryParams },
    },
  }
}

export interface BlogData {
  page: ArticleData
  query: string
  queryParams: {
    slug: string
  }
}

interface PageProps {
  data: BlogData
  preview: boolean
}

export default function Blog({ data, preview }: PageProps) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  // Client-side uses the same query, so we may need to filter it down again
  const page = filterDataToSingleItem(previewData, preview)

  return (
    <div>
      {preview && <Link href="/api/exit-preview">Preview Mode Activated!</Link>}
      {page?.title && <h1>{page.title}</h1>}
      {page?.content && <p>{page.content}</p>}
    </div>
  )
}
