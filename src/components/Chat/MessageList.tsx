import MessageDetail from './MessageDetail'

interface MessageListProps {
  messages: any[]
}

export default function MessageList ({ messages }: MessageListProps) {
  return (
    <section className='w-full flex flex-col gap-3 overflow-y-auto h-[50vh]'>
      {
        messages.map((message, index) => (
          <MessageDetail key={index} message={message} />
        ))
      }
    </section>
  )
}
