import { Item } from '@/models/infojobs/offer'

interface JobOfferDetailProps {
  offer: Item
}

export default function JobOfferDetail ({ offer }: JobOfferDetailProps) {
  return (
    <article>
      <header>
        <h1>{offer.title}</h1>
        <p>{offer.applications}</p>
      </header>
      <footer>
        <p>{offer.city}</p>
        <p>{offer.salaryMin.value}</p>
        <p>{offer.salaryMax.value}</p>
        <p>{offer.teleworking?.value}</p>
      </footer>
    </article>
  )
}
