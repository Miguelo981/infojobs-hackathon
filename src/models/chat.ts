import { JobOffer, JobsOfferQuery } from './infojobs/offer'

export enum MessageRole {
  USER = 0,
  BOT = 1
}

export interface ChatResponse {
  message: string
  offers?: JobOffer
  messageRole: MessageRole
  createdAt: Date | string
  responseType?: IntentionType
}

export enum IntentionType {
  OFFER_SEARCH = 0
}

export interface UserIntetion {
  responseType: IntentionType
  body: JobsOfferQuery | null
}

export interface ChatMessage {
  messages: ChatResponse[]
  createdAt: string
  updatedAt: string
  pushMessage: (message: ChatResponse) => void
}
