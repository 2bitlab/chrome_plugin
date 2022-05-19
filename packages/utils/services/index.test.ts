import {
  splitUrl,
  getUrlInfoForPost,
  getUrlInfoForGet,
  getUrlInfoForPut,
  getUrlInfoForDel,
  getUrlInfoForPatch,
  getUrlInfo
} from './index'

describe('@belloai/chrome-extension-utils services', () => {
  it('splitUrl', () => {
    expect(JSON.stringify(splitUrl(''))).toBe(
      JSON.stringify({
        name: '',
        funcName: undefined
      })
    )

    expect(JSON.stringify(splitUrl('a_b/c_d'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'c_d'
      })
    )

    expect(JSON.stringify(splitUrl('ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'e_f'
      })
    )

    expect(JSON.stringify(splitUrl('/api/ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'e_f'
      })
    )

    expect(JSON.stringify(splitUrl('/api/api/e_f/g'))).toBe(
      JSON.stringify({
        name: 'Api',
        funcName: 'e_f'
      })
    )
  })

  it('getUrlInfoForPost', () => {
    expect(getUrlInfoForPost('')).toBeUndefined()

    expect(JSON.stringify(getUrlInfoForPost('a_b'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'saveNew'
      })
    )

    expect(JSON.stringify(getUrlInfoForPost('a_b/c_d'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'cD'
      })
    )

    expect(JSON.stringify(getUrlInfoForPost('ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'eF'
      })
    )

    expect(JSON.stringify(getUrlInfoForPost('/api/ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'eF'
      })
    )

    expect(JSON.stringify(getUrlInfoForPost('/api/api/e_f/g'))).toBe(
      JSON.stringify({
        name: 'Api',
        funcName: 'eF'
      })
    )
  })

  it('getUrlInfoForGet', () => {
    expect(getUrlInfoForGet('')).toBeUndefined()

    expect(JSON.stringify(getUrlInfoForGet('a_b'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'list'
      })
    )

    expect(JSON.stringify(getUrlInfoForGet('a_b/c_d'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'getById',
        props: {
          id: 'c_d'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForGet('ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'getById',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForGet('/api/ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'getById',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForGet('/api/api/e_f/g'))).toBe(
      JSON.stringify({
        name: 'Api',
        funcName: 'getById',
        props: {
          id: 'e_f'
        }
      })
    )
  })

  it('getUrlInfoForPut', () => {
    expect(getUrlInfoForPut('')).toBeUndefined()

    expect(getUrlInfoForPut('a_b')).toBeUndefined()

    expect(JSON.stringify(getUrlInfoForPut('a_b/c_d'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'replaceData',
        props: {
          id: 'c_d'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForPut('ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'replaceData',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForPut('/api/ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'replaceData',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForPut('/api/api/e_f/g'))).toBe(
      JSON.stringify({
        name: 'Api',
        funcName: 'replaceData',
        props: {
          id: 'e_f'
        }
      })
    )
  })

  it('getUrlInfoForPatch', () => {
    expect(getUrlInfoForPatch('')).toBeUndefined()

    expect(getUrlInfoForPatch('a_b')).toBeUndefined()

    expect(JSON.stringify(getUrlInfoForPatch('a_b/c_d'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'update',
        props: {
          id: 'c_d'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForPatch('ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'update',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForPatch('/api/ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'update',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForPatch('/api/api/e_f/g'))).toBe(
      JSON.stringify({
        name: 'Api',
        funcName: 'update',
        props: {
          id: 'e_f'
        }
      })
    )
  })

  it('getUrlInfoForDel', () => {
    expect(getUrlInfoForDel('')).toBeUndefined()

    expect(getUrlInfoForDel('a_b')).toBeUndefined()

    expect(JSON.stringify(getUrlInfoForDel('a_b/c_d'))).toBe(
      JSON.stringify({
        name: 'AB',
        funcName: 'del',
        props: {
          id: 'c_d'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForDel('ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'del',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForDel('/api/ab_cd/e_f/g'))).toBe(
      JSON.stringify({
        name: 'AbCd',
        funcName: 'del',
        props: {
          id: 'e_f'
        }
      })
    )

    expect(JSON.stringify(getUrlInfoForDel('/api/api/e_f/g'))).toBe(
      JSON.stringify({
        name: 'Api',
        funcName: 'del',
        props: {
          id: 'e_f'
        }
      })
    )
  })

  it('getUrlInfo', () => {
    expect(getUrlInfo('', '')).toBeUndefined()
    expect(getUrlInfo('/api/plugin_config', 'x')).toBeUndefined()
    expect(JSON.stringify(getUrlInfo('/api/plugin_config', 'get'))).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'list'
      })
    )
    expect(JSON.stringify(getUrlInfo('/api/plugin_config', 'post'))).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'saveNew'
      })
    )
    expect(
      JSON.stringify(getUrlInfo('/api/plugin_config/get_all_list', 'post'))
    ).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'getAllList'
      })
    )

    expect(
      JSON.stringify(getUrlInfo('/api/plugin_config/adfa1231_1231', 'get'))
    ).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'getById',
        props: {
          id: 'adfa1231_1231'
        }
      })
    )

    expect(
      JSON.stringify(getUrlInfo('/api/plugin_config/adfa1231_1231', 'put'))
    ).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'replaceData',
        props: {
          id: 'adfa1231_1231'
        }
      })
    )

    expect(
      JSON.stringify(getUrlInfo('/api/plugin_config/adfa1231_1231', 'delete'))
    ).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'del',
        props: {
          id: 'adfa1231_1231'
        }
      })
    )

    expect(
      JSON.stringify(getUrlInfo('/api/plugin_config/adfa1231_1231', 'patch'))
    ).toBe(
      JSON.stringify({
        name: 'PluginConfig',
        funcName: 'update',
        props: {
          id: 'adfa1231_1231'
        }
      })
    )
  })
})
