import { Item } from '@/models/infojobs/offer'

interface MinimumOfferDetailProps {
  item: Item
  index: number
}

export default function MinimumOfferDetail ({ item, index }: MinimumOfferDetailProps) {
  return (
    <article className='text-inherit'>
      <h2><small>{index}</small>. {item.title}</h2>
      <small>{item.salaryMin.value}</small>
    </article>
  )
}
