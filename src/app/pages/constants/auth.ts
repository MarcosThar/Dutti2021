// TODO sacar a un fichero de configuracion o
// eliminar si levantamos la api al mismo tienpo
const PROTOCOL = 'http'
const HOST = 'localhost'
const PORT = '3000'
const useProxy = true
// 
const urlBase = `${!useProxy ?
    `${PROTOCOL}://${HOST}${PORT ? `:${PORT}` : ''}` :
    ''
    }/api/auth/`

const AUTH_API = {
    LOGIN: `${urlBase}login`,
    REGISTER: `${urlBase}register`
}
export { AUTH_API }