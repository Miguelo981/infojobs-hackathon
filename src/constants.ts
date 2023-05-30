export const INFOJOBS_API_URL = 'https://api.infojobs.net/api'
export const INFOJOBS_TOKEN = process.env.INFOJOBS_TOKEN ?? ''
export const OPENAI_REQUEST_INTENTION_SCHEMA = `
  If the users wants to query / find a job, the responseType is 0 and the body will be a query object filled by users needs with no messages. You will reply only with responseType and body even If there is not job offers in the city or province you recieve.
  This are the query object properties:
  {
    q?: string
    province?: string // separated by '-' (example: las-palmas)
    city?: string // separated by '-' (example: santa-lucia-de-tirajana)
    country?: string // separated by '-' (example: arabia-saudita)
    salaryMin?: string
    salaryPeriod?: string
    contactType?: string
    experienceMin?: string
    order?: string
    page?: string
    maxResults?: string
    sinceDate?: string
    teleworking?: string // accepts 'teletrabajo-posible' or 'solo-teletrabajo'
  },
  If the user wants to know more about the chat bot usage, options, the responseType is 1 and the body will be the an string talking about what you offer yourself in Spanish,
  If the user says hello or introduce himself, the responseType is 1 and the body will be the an string introducing talking about what you offer yourself in Spanish,
  If the user wants to know more about a job offer, you will recieve a list of type 'Job-list:[{ index, id }]', the responseType is 2 and the body will be a list of offerIds of the prompted list the user is asking:
  body: { "offerIds: string[] },
  If the user wants to postulate to a job offer, the responseType is 3 and the body will be the empty object,
  
`
export const OPENAI_RESPONSE_FORMAT = `You have to always return with the JSON format. Do not reply anything else, no sorry phrases, just the following format in JSON to be correctly parsed like this: 
{
  "responseType": [[type]],
  "body": [[body]],
  "message": [[message]]
}
`
export const TEST_OPENAI_REQUEST = 'Dame ofertas donde te paguen más de 1000€ al mes por programar web en España'
export const TEST_OPENAI_RESPONSE = `
  {
    "responseType": 0,
    "body": {
      "salaryMin": 1000,
      "contry": "espana",
      "q": "programador web"
    },
    "message": null
  }
`
export const TEST_OPENAI_REQUEST2 = 'Buenas tardes'
export const TEST_OPENAI_RESPONSE2 = `
  {
    "responseType": 1,
    "body": {},
    "message": "Soy tu Asistente de Infojobs, puedes preguntarme sobre ofertas de trabajo."
  }
`
export const TEST_OPENAI_REQUEST3 = 'Me gustaria saber mas sobre la oferta 2. Job-list:[{ index: 1, offerId: "0baef5dc154270ad1bdb379f542512" }, { index: 2, offerId: "0baef5dc154270ad1bdb435wfwer4" }, { index: 3, offerId: "0234dsff5dc154270ad1bdbgv43rwer542512" }]'
export const TEST_OPENAI_RESPONSE3 = `
  {
    "responseType": 2,
    "body": {
      "offerIds": [
        "0baef5dc154270ad1bdb435wfwer4"
      ]
    },
    "message": null
  }
`
export const TEST_OPENAI_REQUEST4 = 'Quiero presentar mi candicatura para la oferta 3'
export const TEST_OPENAI_RESPONSE4 = `
  {
    "responseType": 3,
    "body": {
      "offerIndex": 3
    },
    "message": null
  }
`
export const TEST_OPENAI_REQUEST5 = 'Me gustaria saber mas sobre la oferta 1 y 3. Job-list:[{ index: 1, offerId: "0baef5dc154270ad1bdb379f542512" }, { index: 2, offerId: "0baef5dc154270ad1bdb435wfwer4" }, { index: 3, offerId: "0234dsff5dc154270ad1bdbgv43rwer542512" }]'
export const TEST_OPENAI_RESPONSE5 = `
  {
    "responseType": 2,
    "body": {
      "offerIds": [
        "0baef5dc154270ad1bdb379f542512",
        "0234dsff5dc154270ad1bdbgv43rwer542512"
      ]
    },
    "message": null
  }
`
export const TEST_OPENAI_REQUEST6 = 'dame mas informacion oferta 1 y 3. Job-list:[{ index: 1, offerId: "0baef5dc154270ad1bdb379f542512" }, { index: 2, offerId: "0baef5dc154270ad1bdb435wfwer4" }, { index: 3, offerId: "0234dsff5dc154270ad1bdbgv43rwer542512" }]'
export const TEST_OPENAI_RESPONSE6 = `
  {
    "responseType": 2,
    "body": {
      "offerIds": [
        "0baef5dc154270ad1bdb379f542512",
        "0234dsff5dc154270ad1bdbgv43rwer542512"
      ]
    },
    "message": null
  }
`
export const TEST_OPENAI_REQUEST7 = 'dame mas info de la segunda y tercer oferta. Job-list:[{ index: 1, offerId: "0baef5dc154270ad1bdb379f542512" }, { index: 2, offerId: "0baef5dc154270ad1bdb435wfwer4" }, { index: 3, offerId: "0234dsff5dc154270ad1bdbgv43rwer542512" }]'
export const TEST_OPENAI_RESPONSE7 = `
  {
    "responseType": 2,
    "body": {
      "offerIds": [
        "0baef5dc154270ad1bdb435wfwer4",
        "0234dsff5dc154270ad1bdbgv43rwer542512"
      ]
    },
    "message": null
  }
`
export const CHAT_MESSAGES_LS_KEY = 'chat-messages'
