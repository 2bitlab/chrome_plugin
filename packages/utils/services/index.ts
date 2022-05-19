import { camelCase, upperFirst, snakeCase, isString } from 'lodash'
import { stringify } from 'qs'

import { Path2FetchInfoProps, FetchInfo2ServiceInfoProps } from './type'

export enum FuncNameEnum {
  getById = 'getById',
  list = 'list',
  saveNew = 'saveNew',
  replaceData = 'replaceData',
  update = 'update',
  del = 'del'
}

export enum HttpMethodEnum {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export const splitUrl = (url: string) => {
  const urlPath = url.replace(/^\/api\//, '')
  const [name, funcName] = urlPath.split('/')

  return {
    name: upperFirst(camelCase(name)),
    funcName
  }
}

export const getUrlInfoForPost = (url: string) => {
  const { name, funcName } = splitUrl(url)

  if (name) {
    return {
      name,
      funcName: camelCase(funcName || FuncNameEnum.saveNew)
    }
  }
}

const getUrlInfoForId = (url: string, defFuncName: string) => {
  const { name, funcName } = splitUrl(url)

  if (!defFuncName) {
    return {
      name
    }
  }

  let props
  if (funcName) {
    props = {
      id: funcName
    }

    return {
      name,
      funcName: defFuncName,
      props
    }
  }
}

export const getUrlInfoForGet = (url: string) => {
  const { name, props } = getUrlInfoForId(url, '') || {}
  if (name) {
    return {
      name,
      funcName: props ? FuncNameEnum.getById : FuncNameEnum.list,
      props
    }
  }
}

export const getUrlInfoForPut = (url: string) => {
  return getUrlInfoForId(url, FuncNameEnum.replaceData)
}

export const getUrlInfoForDel = (url: string) => {
  return getUrlInfoForId(url, FuncNameEnum.del)
}
export const getUrlInfoForPatch = (url: string) => {
  return getUrlInfoForId(url, FuncNameEnum.update)
}

/**
 * get /api/plugin_config -> PluginConfig/list
 * post /api/plugin_config -> PluginConfig/saveNew
 * get /api/plugin_config/:id -> PluginConfig/getById
 * put /api/plugin_config/:id -> PluginConfig/replaceData
 * patch /api/plugin_config/:id -> PluginConfig/update
 * delete /api/plugin_config/:id -> PluginConfig/del
 * post /api/plugin_config/test_func -> PluginConfig/testFunc
 */
export const getUrlInfo = (url: string, method: string) => {
  const methodUpper = method.toUpperCase()

  const func = {
    [HttpMethodEnum.POST]: getUrlInfoForPost,
    [HttpMethodEnum.GET]: getUrlInfoForGet,
    [HttpMethodEnum.PUT]: getUrlInfoForPut,
    [HttpMethodEnum.DELETE]: getUrlInfoForDel,
    [HttpMethodEnum.PATCH]: getUrlInfoForPatch
  }[methodUpper]

  if (func) {
    return func(url)
  }
}

export const fetchInfo2ServiceInfo = (args: FetchInfo2ServiceInfoProps) => {
  const { url, method, params, query, body } = args
  const {
    funcName,
    name,
    props: funcProps
  } = getUrlInfo(url, method) || ({} as any)

  if (name) {
    return {
      funcName,
      name,
      props: {
        ...(params || {}),
        ...(query || {}),
        ...(body || {}),
        ...(funcProps || {})
      }
    }
  }
}

export const getIdByProps = (props: any) => {
  let id
  if (isString(props)) {
    id = props
  } else {
    ;({ id } = props || {})
  }
  return id
}

export const path2FetchInfoByGetById = (args: Path2FetchInfoProps) => {
  const { props, name } = args
  if (!props) {
    return
  }

  const id = getIdByProps(props)
  if (!id) {
    return
  }
  return {
    url: `/api/${name}/${id}`,
    method: HttpMethodEnum.GET
  }
}

export const path2FetchInfoByList = (args: Path2FetchInfoProps) => {
  const { props, name } = args
  let aft = ''
  if (props) {
    aft = `?${stringify(props)}`
  }

  return {
    url: `/api/${name}${aft}`,
    method: HttpMethodEnum.GET
  }
}

export const path2FetchInfoByDel = (args: Path2FetchInfoProps) => {
  const { props, name } = args

  const id = getIdByProps(props)
  if (!id) {
    return
  }

  return {
    url: `/api/${name}/${id}`,
    method: HttpMethodEnum.DELETE
  }
}

export const path2FetchInfoBySaveNew = (args: Path2FetchInfoProps) => {
  const { props, name } = args

  if (!props) {
    return
  }

  return {
    url: `/api/${name}`,
    method: HttpMethodEnum.POST,
    body: props
  }
}

const path2FetchInfoByUpdateBase = (
  args: Path2FetchInfoProps,
  method: string
) => {
  const { props, name } = args

  if (!props) {
    return
  }

  // eslint-disable-next-line no-restricted-syntax
  const { id, ...body } = props

  if (!id) {
    return
  }

  return {
    url: `/api/${name}/${id}`,
    method,
    body
  }
}

export const path2FetchInfoByReplaceData = (args: Path2FetchInfoProps) => {
  return path2FetchInfoByUpdateBase(args, HttpMethodEnum.PUT)
}

export const path2FetchInfoByUpdate = (args: Path2FetchInfoProps) => {
  return path2FetchInfoByUpdateBase(args, HttpMethodEnum.PATCH)
}

export const path2FetchInfoByOtherFuncName = (args: Path2FetchInfoProps) => {
  const { props, name, funcName } = args
  return {
    url: `/api/${name}/${funcName}`,
    method: HttpMethodEnum.POST,
    body: props
  }
}

export const path2FetchInfo = (path: string, props: any) => {
  const [name, funcName] = path.split('/')
  if (!name || !funcName) {
    return
  }

  const func =
    {
      [FuncNameEnum.getById]: path2FetchInfoByGetById,
      [FuncNameEnum.list]: path2FetchInfoByList,
      [FuncNameEnum.del]: path2FetchInfoByDel,
      [FuncNameEnum.replaceData]: path2FetchInfoByReplaceData,
      [FuncNameEnum.saveNew]: path2FetchInfoBySaveNew,
      [FuncNameEnum.update]: path2FetchInfoByUpdate
    }[funcName] || path2FetchInfoByOtherFuncName

  return func({ name: snakeCase(name), funcName: snakeCase(funcName), props })
}
