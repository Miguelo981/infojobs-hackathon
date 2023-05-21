import { ChatResponse, IntentionType } from '@/models/chat'
import MinimumOfferDetail from './MinimumOfferDetail'

interface BotMessageBodyProps {
  message: ChatResponse
}

export default function BotMessageBody ({ message }: BotMessageBodyProps) {
  return (
    <>
      {
      message.responseType === IntentionType.OFFER_SEARCH
        ? <div className='flex flex-col gap-3'>
          {
              message.offers?.items?.map((item) => (
                <div key={item.id} className='px-4 py-2 bg-blue-300 text-black w-fit rounded-r-lg rounded-tl-lg'>
                  <MinimumOfferDetail item={item} />
                </div>
              ))
            }
          </div>

        : null
      }
    </>
  )
}
