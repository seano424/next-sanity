import { getArticles, getPages } from '../lib/queries'
import { ArticleData } from '../lib/interfaces'
import Ribbon from '@/components/Ribbon'
import Link from 'next/link'

interface HomeProps {
  articles: ArticleData[]
  pages: {
    title: string
    slug: {
      current: string
    }
  }[]
}

export default function Home({ articles, pages }: HomeProps) {
  console.log('pages: ', pages)

  return (
    <>
      <nav className="text-xl flex flex-col gap-10 p-5">
        <ul className="space-x-3">
          {pages &&
            pages.map((page, index) => (
              <Link
                className="underline underline-offset-4 hover:opacity-50 transition-opacity duration-200 ease-linear"
                href={`/${page.slug.current}`}
                key={index}
              >
                {page.title}
              </Link>
            ))}
        </ul>
        <ul className="space-x-3">
          {articles &&
            articles.map((a, index) => (
              <Link
                className="underline underline-offset-4 hover:opacity-50 transition-opacity duration-200 ease-linear"
                href={`/blog/${a.slug.current}`}
                key={index}
              >
                {a.title}
              </Link>
            ))}
        </ul>
      </nav>
      <div className="flex justify-center mt-20">
        <div className="bg-teal-100 rounded h-80 aspect-square relative">
          <Ribbon>Woohoo</Ribbon>
          <Ribbon position="top-left" color="purple">
            Woohoo
          </Ribbon>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const articles = await getArticles(preview)
  const pages = await getPages(preview)
  return {
    props: { preview, articles, pages },
    revalidate: 600,
  }
}
