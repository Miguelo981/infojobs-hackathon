import { ChangeEvent, KeyboardEvent, useState } from 'react'

interface InputMessageProps {
  onMessageEntered: (message: string) => void
}

export default function InputMessage ({ onMessageEntered }: InputMessageProps) {
  const [message, setMessage] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target

    setMessage(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Enter') return

    onMessageEntered(message)

    setMessage('')
  }

  return (
    <textarea className='text-black w-full min-h-[50px] rounded-lg mt-6 p-2 focus:outline-none' onChange={handleChange} onKeyDown={handleKeyDown} value={message} />
  )
}
