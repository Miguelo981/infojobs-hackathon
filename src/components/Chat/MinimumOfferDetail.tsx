import { Item } from '@/models/infojobs/offer'
import Link from 'next/link'

interface MinimumOfferDetailProps {
  item: Item
  index: number
}

export default function MinimumOfferDetail ({ item, index }: MinimumOfferDetailProps) {
  const handleReadMore = () => {
  }

  return (
    <article className='text-inherit'>
      <Link href={item.link} target='_blank' rel='noreferrer'>
        <h2 className='font-extrabold text-lg'><small>{index}</small>. {item.title}</h2>
      </Link>
      <h3 className='mb-4 font-light'>{item.author.name}</h3>
      <p className='mb-4'><small className='font-bold'>{item.salaryDescription}</small></p>
      <button onClick={handleReadMore} className='text-xs text-slate-700'>Ver más</button>
    </article>
  )
}
