import { RequestHandler } from 'express'

import { serverApiServices } from '../services/server'

export const apiHandler: RequestHandler = async (req, res) => {
  const { body, query, params, originalUrl: url, method } = req
  // console.log('api req', req)

  console.log('api method', method)
  console.log('api url', url)
  console.log('api body', body)
  console.log('api query', query)
  console.log('api params', params)

  let data
  let status = 200

  try {
    data = await serverApiServices({
      url,
      method,
      params,
      query,
      body
    })
  } catch (error) {
    console.error('apiHandler error', error)
    data = {
      msg: `${error}`
    }
    status = 400
  }

  res.status(status)
  res.json(data)
}
