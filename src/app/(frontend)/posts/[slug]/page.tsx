/* eslint-disable jsx-a11y/alt-text */
import { client, sanityFetch } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import { Post } from '@/components/Post'
import { POST_QUERY, POSTS_SLUGS_QUERY } from "@/sanity/lib/queries";

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({useCdn: false})
    .fetch(POSTS_SLUGS_QUERY);

  return slugs
}

type PostIndexProps = { params: { slug: string } }

export default async function Page({ params }: PostIndexProps) {
  const post = await sanityFetch({query: POST_QUERY, params})

  if (!post) {
    notFound()
  }

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Post {...post} />
    </main>
  );
}
