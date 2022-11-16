import { groq } from 'next-sanity'
import { getAllPageSlugs, getPage } from 'lib/queries'
import { usePreviewSubscription } from '../lib/sanity'
import { filterDataToSingleItem } from '../lib/helpers'
import { GetStaticProps, GetStaticPaths } from 'next/types'
import TextWithIllustration from '../components/TextWithIllustration'
import Hero from '../components/Hero'
import CallToAction from '../components/CallToAction'

export type PageProps = {
  data: {
    page: {
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
    query: string
    queryParams: {
      slug: string
    }
  }
  preview: boolean
}

/**
 * The `usePreviewSubscription` takes care of updating
 * the preview content on the client-side
 */
export default function Page({ data, preview }: PageProps) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    // The hook will return this on first render
    // This is why it's important to fetch *draft* content server-side!
    initialData: data?.page,
    // The passed-down preview context determines whether this function does anything
    enabled: preview,
  })

  const page = filterDataToSingleItem(previewData, preview)
  console.log(page)

  const componentsMap: any = {
    hero: Hero,
    textWithIllustration: TextWithIllustration,
    callToAction: CallToAction,
  }

  return (
    <main className="container">
      {page && (
        <div>
          <p>{page.title}</p>
          {page.pageBuilder?.length && (
            <div>
              {page.pageBuilder.map((p: any, i: number) => {
                const DynamicComponent = componentsMap[p._type]
                if (DynamicComponent) {
                  return <DynamicComponent {...p} key={p._key} />
                }
                return <div key={i}></div>
              })}
            </div>
          )}
        </div>
      )}
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await getAllPageSlugs()

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
  const data = await getPage(params, preview)

  if (!data) return { notFound: true }

  const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      preview,
      data: { page, query, queryParams },
    },
  }
}
