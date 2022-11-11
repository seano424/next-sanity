import { getArticles } from '../lib/queries'
import { ArticleData } from '../lib/interfaces'
import Link from 'next/link'

interface HomeProps {
  articles: ArticleData[]
}

export default function Home({ articles }: HomeProps) {
  return (
    <>
      <nav className="text-xl flex items-center gap-10 p-5">
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
      </nav>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const articles = await getArticles(preview)
  return {
    props: { preview, articles },
    revalidate: 600,
  }
}
