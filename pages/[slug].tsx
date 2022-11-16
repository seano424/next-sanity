import { groq } from 'next-sanity'
import { usePreviewSubscription } from '../lib/sanity'
import { filterDataToSingleItem } from '../lib/helpers'
import { getClient } from '../lib/sanity.server'
import { GetStaticProps, GetStaticPaths } from 'next/types'
import TextWithIllustration from '../components/TextWithIllustration'
import Hero from '../components/Hero'
import CallToAction from '../components/CallToAction'

export type MyProps = {
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

export default function Page({ data, preview }: MyProps) {
  const { data: previewData } = usePreviewSubscription(data?.query, {
    params: data?.queryParams ?? {},
    initialData: data?.page,
    enabled: preview,
  })

  const page = filterDataToSingleItem(previewData, preview)

  const componentsMap: any = {
    hero: Hero,
    textWithIllustration: TextWithIllustration,
    callToAction: CallToAction,
  }

  return (
    <div className="container">
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
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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

  if (!data) return { notFound: true }

  const page = filterDataToSingleItem(data, preview)

  return {
    props: {
      preview,
      data: { page, query, queryParams },
    },
  }
}
