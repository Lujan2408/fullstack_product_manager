const BASE_URL = import.meta.env.VITE_API_URL_PRODUCTION?.replace(/\/+$/, "") ?? ""

export function apiUrl(path: string) {
  return `${BASE_URL}/${path.replace(/^\/+/, "")}`
}