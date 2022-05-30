// import ExConfig from '@server/entities/ExConfig'

import { saveConfig, loadData, getConfig } from '../data'

import ExConfig from '../entities/ExConfig'

export default class PluginConfigService {
  static async save(args: ExConfig) {
    console.log('PluginConfigService save', args)

    const { path_name, type, manifest } = new ExConfig(args)

    saveConfig(type, path_name, manifest)

    return {
      ...args
    }
  }

  static async loadData() {
    return loadData()
  }

  static async getData({
    type,
    path_name
  }: {
    type: string
    path_name: string
  }) {
    return getConfig(`${type}/${path_name}`)
  }
}
