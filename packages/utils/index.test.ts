import { servicesUtils } from './index'

describe('@belloai/chrome-extension-utils', () => {
  it('services.getUrlInfo', () => {
    expect(servicesUtils.getUrlInfo).toBeDefined()
  })
})
