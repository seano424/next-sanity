import { groq } from 'next-sanity'
import { usePreviewSubscription } from '../lib/sanity'
import { getClient } from '../lib/sanity.server'
import { GetStaticProps, GetStaticPaths } from 'next/types'

export default function Page() {
  return <div>Page</div>
}
