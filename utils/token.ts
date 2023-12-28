import cookie from 'js-cookie'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { SUBDOMAIN },
} = getConfig()

export const getCmsToken = () => {
  return cookie.get('Token')
}

export const setCmsToken = (val: any) => {
  if (window.location.origin.includes('localhost')) {
    return cookie.set('Token', val)
  }
  return cookie.set('Token', val, {
    domain: SUBDOMAIN,
  })
}

export const removeCmsToken = () => {
  cookie.remove('Token')
  cookie.remove('Token', {
    domain: SUBDOMAIN,
  })
}
