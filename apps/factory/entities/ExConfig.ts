import {
  getManifestConfig,
  ManifestConfig3
} from '@belloai/chrome-extension-manifest'

export class ExConfig {
  manifestConfig: ManifestConfig3
  constructor(manifestConfig: ManifestConfig3) {
    this.manifestConfig = manifestConfig
  }

  static getInstance(manifestConfig: ManifestConfig3) {
    return new ExConfig(getManifestConfig(manifestConfig))
  }
}
