import { dev } from '$app/environment'
import { VITE_SANITY_ID } from '$env/static/private'
import { type ClientConfig, createClient } from '@sanity/client'

const sanityConfig: ClientConfig = {
	projectId: VITE_SANITY_ID,
	dataset: 'production',
	useCdn: !dev,
	apiVersion: '2023-11-03',
}

export const sanityClient = createClient(sanityConfig)
