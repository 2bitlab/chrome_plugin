// import ExConfig from '@server/entities/ExConfig'

import { saveConfig, loadData } from '../data'

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
}
