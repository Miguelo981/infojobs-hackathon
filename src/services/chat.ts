import { ChatResponse } from '@/models/chat'

const ENDPOINT = '/api/chat-bot'

export async function askChatBot (message: string): Promise<ChatResponse | null> {
  try {
    const res = await fetch(`${ENDPOINT}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
