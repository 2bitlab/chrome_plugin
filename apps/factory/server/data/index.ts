import fs from 'fs-extra'
import { resolve } from 'path'
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

  fs.ensureDirSync(saasPath)
  const saasDirs = fs.readdirSync(saasPath)

  fs.ensureDirSync(customPath)
  const customDirs = fs.readdirSync(customPath)

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
  console.log('saveConfig')
  const path = getPath(`${type || 'saas'}/${pathName}/manifest.json`)
  console.log('saveConfig', path, config)
  fs.ensureFileSync(path)
  fs.writeJsonSync(path, config, {
    spaces: 2
  })
}

export const getConfig = (fullPathName: string) => {
  console.log('getConfig')
  const path = getPath(`${fullPathName}/manifest.json`)
  console.log('getConfig', path, fullPathName)

  const manifest = fs.readJSONSync(path)
  return {
    fullPathName,
    manifest
  }
}
