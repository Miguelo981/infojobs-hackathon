export const INFOJOBS_API_URL = 'https://api.infojobs.net/api'
export const INFOJOBS_TOKEN = process.env.INFOJOBS_TOKEN ?? ''
export const OPENAI_REQUEST_INTENTION_SCHEMA = `
  If the users wants to query / find a job in any language, the responseType is 0 and the body will be a query object filled by users needs. This are the query object properties:
  {
    q?: string
    province?: string // separated by '-' (example: las-palmas)
    city?: string // separated by '-' (example: santa-lucia-de-tirajana)
    country?: string // separated by '-' (example: arabia-saudita)
    salaryMin?: string
    salaryPeriod?: string
    contactType?: string
    experienceMin?: string
    workday?: string
    employerId?: string
    emph?: string
    order?: string
    page?: string
    maxResults?: string
    facets?: string
    sinceDate?: string
    teleworking?: string // accepts 'teletrabajo-posible' or 'solo-teletrabajo'
  }
  provinces are lowercase always
`
export const OPENAI_RESPONSE_FORMAT = `The format must be in JSON like this: 
{
  "responseType": [[type]],
  "body": [[body]]
}
`
export const TEST_OPENAI_REQUEST = 'Dame ofertas donde te paguen más de 1000€ al mes por programar web en España'
export const TEST_OPENAI_RESPONSE = `
  {
    "responseType": 0,
    "body": {
      "salaryMin": 1000,
      "contry": "espana",
      "q": "programador web",
    }
  }
`
export const CHAT_MESSAGES_LS_KEY = 'chat-messages'
