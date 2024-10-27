/* eslint-disable jsx-a11y/alt-text */
import { sanityFetch } from '@/sanity/lib/live'
import { POST_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { Post } from '@/components/Post'

type PostIndexProps = { params: { slug: string } }

export default async function Page({ params }: PostIndexProps) {
  const {data: post} = await sanityFetch({query: POST_QUERY, params})

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}
