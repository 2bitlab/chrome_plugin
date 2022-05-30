/* eslint-disable no-restricted-globals */
import fetch, { Headers } from 'cross-fetch'

import { servicesUtils, ServicesHelper } from '@belloai/chrome-extension-utils'

const { path2FetchInfo } = servicesUtils

const defaultHeaders = new Headers({
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  Accept: 'application/json'
})

export const clientServices: ServicesHelper = async (
  path: string,
  props: any
) => {
  const { url, method, body } = path2FetchInfo(path, props) || ({} as any)
  const { location } = window || {}
  const { origin } = location || {}
  const uri = `${origin}${url}`
  console.log('clientServices', uri, method, body)

  const res = await fetch(uri, {
    method,
    body: JSON.stringify(body),
    headers: defaultHeaders
  })

  return res.json()
}

export default clientServices
