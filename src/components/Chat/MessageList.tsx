import MessageDetail from './MessageDetail'

interface MessageListProps {
  messages: any[]
}

export default function MessageList ({ messages }: MessageListProps) {
  return (
    <div className='w-full flex flex-col gap-3'>
      {
        messages.map((message, index) => (
          <MessageDetail key={index} message={message} />
        ))
      }
    </div>
  )
}
