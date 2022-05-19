import {
  getManifestConfig,
  ManifestConfig3
} from '@belloai/chrome-extension-manifest'

export default class ExConfig {
  type: 'saas' | 'custom'
  path_name: string
  manifest: ManifestConfig3

  constructor(instance: ExConfig) {
    const { manifest, path_name, type } = instance

    this.manifest = getManifestConfig(manifest)

    this.path_name = path_name
    this.type = type
  }
}
