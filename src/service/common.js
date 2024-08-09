import { COOKIE_KEY } from '../constants'

export function getToken(){
    const reg = new RegExp(`(?:(?:^|.*;\\s*)${COOKIE_KEY}\\s*=\\s*([^;]*).*$)|^.*$`)
    const token = document.cookie.replace(reg, '$1')
    return token
}
