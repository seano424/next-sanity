import { getArticles } from '../lib/queries'
import { ArticleData } from '../lib/interfaces'

interface HomeProps {
  articles: ArticleData[]
}

export default function Home({ articles }: HomeProps) {
  console.log(articles)

  return <div>Home</div>
}

export async function getStaticProps({ preview = false }) {
  const articles = await getArticles(preview)
  return {
    props: { preview, articles },
    revalidate: 600,
  }
}
