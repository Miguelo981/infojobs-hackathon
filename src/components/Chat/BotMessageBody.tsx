import { ChatResponse, IntentionType } from '@/models/chat'
import MinimumOfferDetail from './MinimumOfferDetail'
import DetailedOfferDetail from './DetailedOfferDetail'

interface BotMessageBodyProps {
  message: ChatResponse
}

export default function BotMessageBody ({ message }: BotMessageBodyProps) {
  return (
    <div className='flex gap-x-2 items-start'>
      {/* <ChatBotIcon className='w-16 h-auto' /> */}
      {
      message.responseType === IntentionType.OFFER_SEARCH
        ? (
          <div className='flex flex-col gap-3'>
            {
              message.offers?.items?.map((item, index: number) => (
                <div key={item.id} className='px-4 py-2 bg-secondary text-primary w-fit rounded-r-lg rounded-tl-lg'>
                  <MinimumOfferDetail item={item} index={index + 1} />
                </div>
              ))
            }
          </div>
          )

        : message.responseType === IntentionType.INTRODUCTION
          ? (
            <div className='px-4 py-2 bg-secondary text-primary w-fit rounded-r-lg rounded-tl-lg'>
              <p>{message.text}</p>
            </div>
            )
          : message.responseType === IntentionType.OFFER_DETAIL
            ? (
              <div className='flex flex-col gap-3'>
                {
              message.offers?.items?.map((item, index: number) => (
                <div key={item.id} className='px-4 py-2 bg-secondary text-primary w-fit rounded-r-lg rounded-tl-lg'>
                  <DetailedOfferDetail item={item} index={index + 1} />
                </div>
              ))
            }
              </div>
              )
            : null
      }
    </div>
  )
}
