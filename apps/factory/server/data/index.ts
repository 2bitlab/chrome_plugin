import fs from 'fs-extra'
import { resolve } from 'path'
import { ExConfig } from '../entities/ExConfig'
import { ManifestConfig3 } from '@belloai/chrome-extension-manifest'

function getPath(path: string) {
  const baseDataPath = 'data'
  return resolve(`${baseDataPath}/${path}`)
}

export const loadData = () => {
  const saasPath = getPath('saas')
  const customPath = getPath('custom')

  console.log('saasPath', saasPath)
  console.log('customPath', customPath)

  const saasDirs = fs.ensureDirSync(saasPath)
  const customDirs = fs.ensureDirSync(customPath)

  console.log('saasDirs', saasDirs)
  console.log('customDirs', customDirs)

  return {
    saasDirs,
    customDirs
  }
}

export const saveConfig = (
  type: 'saas' | 'custom',
  pathName: string,
  config: ManifestConfig3
) => {
  const { manifestConfig } = ExConfig.getInstance(config)

  const path = getPath(`${type}/${pathName}/manifest.json`)

  // fs.ensureFileSync(path)
  fs.writeJsonSync(path, manifestConfig)
}
