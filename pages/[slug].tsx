import { groq } from 'next-sanity'
import { usePreviewSubscription } from '../lib/sanity'
import { filterDataToSingleItem } from '../lib/helpers'
import { getClient } from '../lib/sanity.server'
import { GetStaticProps, GetStaticPaths } from 'next/types'
import TextWithIllustration from '../components/TextWithIllustration'
import Hero from '../components/Hero'

export const getStaticPaths: GetStaticPaths = async () => {
  // *[defined(slug.current)][].slug.current
  const allSlugsQuery = groq`*[_type == "page"][].slug.current`
  const pages = await getClient().fetch(allSlugsQuery)

  return {
    paths: pages.map((slug: string) => `/${slug}`),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const query = groq`*[_type == "page" && slug.current == $slug]`
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

interface Page {
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
  slug: {
    _type: string
    current: string
  }
  title: string
  pageBuilder?: []
}

interface PageProps {
  data: {
    page: Page
    query: string
    queryParams: {
      slug: string
    }
  }
  preview: boolean
}

export default function Page({ data, preview }: PageProps) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  // Client-side uses the same query, so we may need to filter it down again
  const page: Page = filterDataToSingleItem(previewData, preview)
  console.log(page)

  function pageBuilderSwitch(params: any) {
    switch (params._type) {
      case 'hero':
        return <Hero {...params} key={params._key} />
      case 'textWithIllustration':
        return <TextWithIllustration {...params} key={params._key} />
      case 'callToAction':
        return <div>hello world</div>
      default:
        return <></>
    }
  }

  return (
    <div className='container'>
      {page && (
        <div>
          <p>{page.title}</p>
          {page.pageBuilder?.length && (
            <div>
              {page.pageBuilder.map((p) => {
                return pageBuilderSwitch(p)
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
