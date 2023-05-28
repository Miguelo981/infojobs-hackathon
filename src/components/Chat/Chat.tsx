// import { useChatMessage } from '@/hooks/useChatMessage'
import InputMessage from './InputMessage'
import MessageList from './MessageList'
import { useEffect, useRef, useState } from 'react'
import Loader from '../Loader'
import { useChatMessage } from '@/hooks/useChatMessage'
import { CloseIcon } from '../Icons'
import { useRouter } from 'next/router'
import ConfirmationModal from '../Modal/ConfirmationModal'

// const useChatMessage = dynamic(async () => await import('@/hooks/useChatMessage'), { ssr: false })()

export default function Chat () {
  const { push } = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, fetchQuestion, cleanMessages, isLoading } = useChatMessage()
  const [openModal, setOpenModal] = useState(false)

  const handleMessageTyped = (message: string) => {
    fetchQuestion(message).catch(console.log)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleRemoveChat = () => {
    setOpenModal(true)
  }
  const handleConfirmationClose = (state: boolean) => {
    setOpenModal(false)

    if (!state) return

    cleanMessages()
    push('/').catch(console.log)
  }

  return (
    <div className='w-full lg:w-[600px] rounded-lg bg-white shadow-lg'>
      <header className='p-5 border-b flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-primary'>Infojobs Assistant</h1>
        <button onClick={handleRemoveChat} className='w-6 h-6 cursor-pointer'>
          <CloseIcon className='fill-black' />
        </button>
        <ConfirmationModal visible={openModal} onClose={handleConfirmationClose} title='Borrar chat' description='¿Estás seguro de que quieres borrar el chat?' />
      </header>
      <section className='overflow-y-auto h-[60vh] rounded p-5 bg-[#f4f4f4]'>
        <MessageList messages={messages} />
        <Loader visible={isLoading} />
        <div ref={messagesEndRef} />
      </section>
      <footer className='p-5 border-t'>
        <form className='flex gap-x-2 items-center'>
          <InputMessage onMessageEntered={handleMessageTyped} />
        </form>
      </footer>
    </div>
  )
}
