import { getArticles } from '../lib/queries'
import { ArticleData } from '../lib/interfaces'
import Link from 'next/link'

interface HomeProps {
  articles: ArticleData[]
}

export default function Home({ articles }: HomeProps) {
  console.log(articles)

  return (
    <div>
      <nav className="text-xl">
        {articles &&
          articles.map((a, index) => (
            <Link href={`/blog/${a.slug.current}`} key={index}>
              {a.title}
            </Link>
          ))}
      </nav>
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  const articles = await getArticles(preview)
  return {
    props: { preview, articles },
    revalidate: 600,
  }
}
