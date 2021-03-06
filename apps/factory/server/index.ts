import express from 'express'
import { createPageRenderer } from 'vite-plugin-ssr'
import * as vite from 'vite'

import { apiHandler } from './api'

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

async function startServer() {
  const app = express()

  let viteDevServer
  if (isProduction) {
    app.use(express.static(`${root}/dist/client`))
  } else {
    viteDevServer = await vite.createServer({
      root,
      server: { middlewareMode: 'ssr' }
    })
    app.use(viteDevServer.middlewares)
  }
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  const renderPage = createPageRenderer({ viteDevServer, isProduction, root })

  app.get('/api/*', apiHandler)
  app.post('/api/*', apiHandler)

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url
    }

    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (!httpResponse) return next()
    const stream = await httpResponse.getNodeStream()
    const { statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType)
    stream.pipe(res)
  })

  const port = 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
