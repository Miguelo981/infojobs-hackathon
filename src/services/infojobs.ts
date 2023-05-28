import { INFOJOBS_API_URL, INFOJOBS_TOKEN } from '@/constants'
import { Item, JobOffer, JobsOfferQuery } from '@/models/infojobs/offer'
import { Dictionary, DictionaryId } from '@/types'

const OFFER_ENDPOINT = '/9/offer'
const DICTIONARY_ENDPOINT = '/1/dictionary/'

export async function getOffers (query?: JobsOfferQuery): Promise<JobOffer | null> {
  try {
    const params = new URLSearchParams(query as any)
    const res = await fetch(`${INFOJOBS_API_URL}${OFFER_ENDPOINT}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${INFOJOBS_TOKEN}`
      }
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getOffer (id: string): Promise<Item | null> {
  try {
    const res = await fetch(`${INFOJOBS_API_URL}${OFFER_ENDPOINT}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${INFOJOBS_TOKEN}`
      }
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export async function getDictionaryList (dictionaryId: DictionaryId, parent?: string): Promise<Dictionary[] | undefined> {
  try {
    const params = parent != null ? new URLSearchParams({ parent }) : ''

    const res = await fetch(`${INFOJOBS_API_URL}${DICTIONARY_ENDPOINT}${dictionaryId}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${INFOJOBS_TOKEN}`
      }
    })
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export async function checkIfValidCountry (country: string): Promise<boolean> {
  try {
    const data = await getDictionaryList('country') ?? []

    return data.some((d: Dictionary) => d.key === country)
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function checkIfValidProvince (province: string): Promise<boolean> {
  try {
    const data = await getDictionaryList('province') ?? []

    return data.some((d: Dictionary) => d.key === province)
  } catch (error) {
    console.log(error)
    return false
  }
}

export async function checkIfValidCity (city: string): Promise<boolean> {
  try {
    const data = await getDictionaryList('city') ?? []

    return data.some((d: Dictionary) => d.key === city)
  } catch (error) {
    console.log(error)
    return false
  }
}
