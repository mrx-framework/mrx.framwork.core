import axios from "axios"
import config from "../../config"

axios.defaults.baseURL = `${config.server.ssl ? "https:" : "http:"}//${config.server.host}:${config.server.port}`
axios.defaults.withCredentials = true

const mediaApiVersion = "v1"
const mediaApiUrl = `/api/media/${mediaApiVersion}`

export default {
  GQL_QUERY: payload => axios.post("/graphql", payload),
  IS_AUTHENTICATED: _ => axios.get("/api/me"),
  LOCAL_LOGIN: payload => axios.post("/local/login", payload),

  FETCH_MEDIAS: payload => axios.get(mediaApiUrl, payload),
  UPLOAD_MEDIA: payload => axios.post("/api/media/v1", payload)
}
