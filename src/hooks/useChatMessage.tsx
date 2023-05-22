import { CHAT_MESSAGES_LS_KEY } from '@/constants'
import { ChatMessage, ChatResponse, MessageRole } from '@/models/chat'
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
      pushUserMessage(question)

      const response = await askChatBot(question)

      if (response == null) {
        // TODO handle error
        return
      }

      chatMessageStore.getState().pushMessage(response)

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
