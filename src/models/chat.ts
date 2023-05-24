import { JobOffer, JobsOfferQuery } from './infojobs/offer'

export enum MessageRole {
  USER = 0,
  BOT = 1
}

export interface ChatResponse {
  message: string
  offers?: JobOffer
  text?: string
  messageRole: MessageRole
  createdAt: Date | string
  responseType?: IntentionType
}

export enum IntentionType {
  OFFER_SEARCH = 0,
  INTRODUCTION = 1,
  OFFER_DETAIL = 2,
  OFFER_POSTULATION = 3,
}

export interface UserIntetion {
  responseType: IntentionType
  body: JobsOfferQuery | null
  message?: string
}

export interface ChatMessage {
  messages: ChatResponse[]
  pushMessage: (message: ChatResponse) => void
  cleanMessages: () => void
}
