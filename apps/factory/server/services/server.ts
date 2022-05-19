import PluginConfig from './PluginConfig'

import {
  FetchInfo2ServiceInfoProps,
  servicesUtils
} from '@belloai/chrome-extension-utils'

const { fetchInfo2ServiceInfo } = servicesUtils

const serviceClassMap: any = { PluginConfig }

export const serverApiServices = async (args: FetchInfo2ServiceInfoProps) => {
  const { funcName, name, props } = (fetchInfo2ServiceInfo(args) || {}) as any

  return await serverServices(`${name}/${funcName}`, props)
}

export const serverServices = async (path: string, props?: any) => {
  console.log('serverServices', path, props)

  const [name, funcName] = path.split('/')

  const serviceClass = serviceClassMap[name]

  if (!serviceClass) {
    throw new Error(`not ${name} service`)
  }

  const func = serviceClass[funcName]
  if (!func) {
    throw new Error(`${name} service not ${funcName} function`)
  }

  return await serviceClass[funcName](props)
}

export default serverServices
