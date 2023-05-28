import { CHAT_MESSAGES_LS_KEY } from '@/constants'
import { ChatMessage, ChatResponse, IntentionType, MessageRole } from '@/models/chat'
import { askChatBot } from '@/services/chat'
import { useState } from 'react'
import { create } from 'zustand'

interface useChatMessageResponse {
  readonly messages: ChatResponse[]
  fetchQuestion: (question: string) => Promise<ChatResponse | undefined>
  cleanMessages: () => void
  readonly isLoading: boolean
  readonly error: Error | null
}

export function useChatMessage (): useChatMessageResponse {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const chatMessageStore = create<ChatMessage>()((set) => (
    {
      messages: typeof window !== 'undefined' && window.localStorage.getItem(CHAT_MESSAGES_LS_KEY) != null ? JSON.parse(window.localStorage.getItem(CHAT_MESSAGES_LS_KEY) as string) : [],
      pushMessage: (message: ChatResponse) => {
        if (message == null) return

        // message.createdAt = new Date().toISOString()

        set(state => ({ messages: [...state.messages, message] }))
        window.localStorage.setItem(CHAT_MESSAGES_LS_KEY, JSON.stringify(chatMessageStore.getState().messages))
      },
      cleanMessages: () => {
        chatMessageStore.setState({ messages: [] })
        window.localStorage.setItem(CHAT_MESSAGES_LS_KEY, JSON.stringify(chatMessageStore.getState().messages))
      }
    }
  ))

  const fetchQuestion = async (question: string): Promise<ChatResponse | undefined> => {
    try {
      setIsLoading(true)

      const lastMessage = chatMessageStore.getState().messages[chatMessageStore.getState().messages.length - 1]

      pushUserMessage(question)

      if (lastMessage.responseType === IntentionType.OFFER_SEARCH) {
        question = `${question}. Job-list:${JSON.stringify(lastMessage.offers?.items.map((i, index) => { return { index: index + 1, id: i.id } }))}`
      }

      const response = await askChatBot(question)

      console.log(response)

      if (response == null) {
        // TODO handle error
        return
      }

      switch (response.responseType) {
        case IntentionType.OFFER_SEARCH:
        case IntentionType.INTRODUCTION:
        case IntentionType.OFFER_DETAIL:
          chatMessageStore.getState().pushMessage(response)
          break
       /*  case IntentionType.OFFER_DETAIL:
          const { offerIds } = response

          if (offerIds == null) {
            // TODO handle error
            return
          }

          const msg: ChatResponse = {
            message: '¡Genial! Te muestro la oferta que me has pedido',
            offers: {
              items: offers
            } as JobOffer,
            messageRole: MessageRole.BOT,
            responseType: IntentionType.OFFER_DETAIL,
            createdAt: response.createdAt
          }

          chatMessageStore.getState().pushMessage(msg)

          break
 */ }

      return response
    } catch (err: any) {
      setError(err)
      removeMessage(question)
    } finally {
      setIsLoading(false)
    }
  }

  const pushUserMessage = (message: string) => {
    chatMessageStore.getState().pushMessage({
      message,
      messageRole: MessageRole.USER,
      createdAt: new Date()
    })
  }

  const removeMessage = (message: string) => {
    const messages = chatMessageStore.getState().messages.filter(m => m.message !== message)

    chatMessageStore.setState({ messages })
  }

  const cleanMessages = () => {
    chatMessageStore.getState().cleanMessages()
  }

  return { messages: chatMessageStore.getState().messages, fetchQuestion, cleanMessages, isLoading, error }
}
