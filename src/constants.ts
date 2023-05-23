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
  provinces are lowercase always,
  If the user wants to know more about the chat bot usage, options, the responseType is 1 and the body will be the an string talking about what you offer yourself in Spanish,
  If the user says hello or introduce himself, the responseType is 1 and the body will be the an string introducing talking about what you offer yourself in Spanish,
  If the user wants to know more about a job offer, the responseType is 2 and the body will be the empty object,
  If the user wants to postulate to a job offer, the responseType is 3 and the body will be the empty object,
  
`
export const OPENAI_RESPONSE_FORMAT = `Do not reply anything else but the following return format in JSON like this: 
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
export const TEST_OPENAI_REQUEST2 = 'Buenas tardes'
export const TEST_OPENAI_RESPONSE2 = `
  {
    "responseType": 1,
    "body": "Soy tu Asistente de Infojobs, puedes preguntarme sobre ofertas de trabajo."
  }
`
export const TEST_OPENAI_REQUEST3 = 'Me gustaria saber mas sobre la oferta 3'
export const TEST_OPENAI_RESPONSE3 = `
  {
    "responseType": 2,
    "body": {}
  }
`
export const TEST_OPENAI_REQUEST4 = 'Quiero postularme a la oferta'
export const TEST_OPENAI_RESPONSE4 = `
  {
    "responseType": 3,
    "body": {}
  }
`
export const CHAT_MESSAGES_LS_KEY = 'chat-messages'
