import { useChatMessage } from '@/hooks/useChatMessage'
import InputMessage from './InputMessage'
import MessageList from './MessageList'

export default function Chat () {
  const { readMessages, fetchQuestion, isLoading } = useChatMessage()

  const handleMessageTyped = (message: string) => {
    fetchQuestion(message)
  }

  return (
    <div>
      <section className='w-[600px] rounded-lg border-blue-600 border-4 p-5'>
        <MessageList messages={readMessages()} />
        {
          isLoading && <small>Cargando...</small>
        }
        <div>
          <InputMessage onMessageEntered={handleMessageTyped} />
        </div>
      </section>
    </div>
  )
}
