import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react'

interface InputMessageProps {
  onMessageEntered: (message: string) => void
}

export default function InputMessage ({ onMessageEntered }: InputMessageProps) {
  const [message, setMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setMessage(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return

    handleSend(event)
  }

  const handleSend = (event: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
    event.preventDefault()

    if (message.length < 3) return

    onMessageEntered(message)

    setMessage('')
  }

  return (
    <>
      <input
        type='text'
        id='input-chat'
        name='input-chat'
        placeholder='Escribe tu pregunta...'
        className='text-black w-full h-auto rounded-lg p-2 focus:outline-none'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
      />
      <button type='button' onClick={handleSend} className='primary-btn'>Enviar</button>
    </>
  )
}
