import { RequestHandler } from 'express'

export const apiHandler: RequestHandler = async (req, res) => {
  const url = req.originalUrl
  console.log('api url', url)

  res.status(200)

  res.json({ url })
}
