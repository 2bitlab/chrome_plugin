import { getManifestConfig } from './index'

describe('@belloai/chrome-extension-manifest', () => {
  it('test', () => {
    expect(
      JSON.stringify(
        getManifestConfig({
          name: 'name'
        })
      )
    ).toBe(
      JSON.stringify({
        manifest_version: 3,
        name: 'name',
        version: '0.0.0',
        background: {
          service_worker: 'background.js'
        }
      })
    )
  })
})
