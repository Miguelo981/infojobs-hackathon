import { Item } from '@/models/infojobs/offer'
import Link from 'next/link'

interface DetailedOfferDetailProps {
  item: Item
  index: number
}

export default function DetailedOfferDetail ({ item, index }: DetailedOfferDetailProps) {
  return (
    <article className='text-inherit'>
      <Link href={item.link} target='_blank' rel='noreferrer'>
        <h2 className='font-extrabold text-lg'>{item.title}</h2>
      </Link>
      <p className='font-light mb-4 text-base'>{item.profile?.name}</p>
      <h3 className='font-extrabold mb-4'>Descripción</h3>
      <p className='whitespace-pre-line text-sm mb-2'>{item.description}</p>
      <small className='font-bold'>{item.salaryDescription}</small>
    </article>
  )
}
