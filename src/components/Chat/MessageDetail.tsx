import { ChatResponse, MessageRole } from '@/models/chat'
import { timeAgo } from '@/utils/time'
import BotMessageBody from './BotMessageBody'

interface MessageDetailProps {
  message: ChatResponse
}

export default function MessageDetail ({ message }: MessageDetailProps) {
  return (
    <div className={'max-w-[400px] ' + (message.messageRole === MessageRole.BOT ? 'mr-auto' : 'ml-auto')}>
      {
        message.messageRole === MessageRole.BOT
          ? <BotMessageBody message={message} />
          : (
            <div className='px-4 py-2 bg-primary text-white w-fit rounded-l-lg rounded-tr-lg'>
              <span>{message.message}</span>
            </div>
            )
      }
      <div className={message.messageRole === MessageRole.BOT ? '' : 'text-end'}>
        <time>
          <span className='text-xs text-[#2D3133]'>{timeAgo(new Date(message.createdAt))}</span>
        </time>
      </div>
    </div>
  )
}
