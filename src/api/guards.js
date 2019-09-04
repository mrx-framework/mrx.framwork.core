import api from "./index"

export const IS_AUTHENTICATED = async (to, from, next) => {
  const user = await api.IS_AUTHENTICATED()
  const { data } = user
  if (Object.keys(data).length > 0) return next()
  return next("/login")
}
