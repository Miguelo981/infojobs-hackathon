import { Item } from '@/models/infojobs/offer'

interface MinimumOfferDetailProps {
  item: Item
}

export default function MinimumOfferDetail ({ item }: MinimumOfferDetailProps) {
  return (
    <article className='text-black'>
      <h2>{item.title}</h2>
    </article>
  )
}
