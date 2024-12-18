import {createClient, QueryOptions, type QueryParams} from 'next-sanity'
import { draftMode } from 'next/headers'

import {apiVersion, dataset, projectId} from '../env'

import { token } from './token'

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation\
  stega: { studioUrl: '/studio' },
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = [],
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
  tags?: string[]
}) {

  const isDraftMode = (await draftMode()).isEnabled 

  if( isDraftMode && !token ){
    throw new Error('Missing environment variable SANITY_API_READ_TOKEN')
  }

  const queryOptions: QueryOptions = {}
  let maybeRevalidate = revalidate

  if( isDraftMode ){
    queryOptions.token = token
    queryOptions.perspective = 'previewDrafts'
    queryOptions.stega = true

    maybeRevalidate = 0
  } else if( tags.length ){
    maybeRevalidate = false
  }

  return client.fetch<QueryResponse>(query, params, {
    ...queryOptions,
    next: {
      revalidate: maybeRevalidate, // for simple, time-based revalidation
      tags, // for tag-based revalidation
    },
  })
}