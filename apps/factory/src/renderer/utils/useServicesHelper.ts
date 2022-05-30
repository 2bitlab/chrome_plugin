import { ServicesHelper } from '@belloai/chrome-extension-utils'

let servicesHelper: ServicesHelper

export const useServicesHelper = (): ServicesHelper => {
  return servicesHelper
}

export const setServicesHelper = (sh: ServicesHelper): void => {
  servicesHelper = sh
}
