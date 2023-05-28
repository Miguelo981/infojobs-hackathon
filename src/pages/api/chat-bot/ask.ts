/* eslint-disable no-case-declarations */
import { ChatResponse, IntentionType, MessageRole, UserIntetion } from '@/models/chat'
import { checkIfValidCity, checkIfValidCountry, checkIfValidProvince, getDictionaryList, getOffer, getOffers } from '@/services/infojobs'
import { getCorrectCity, getCorrectProvince, getCountryName, getMessageIntention } from '@/services/openai'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse>
) {
  const { method, body: { message } } = req

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!message || typeof message !== 'string') {
    res.status(400).json({ message: 'Message is required', messageRole: MessageRole.ERROR, createdAt: new Date() })
    return
  }

  switch (method) {
    case 'POST':
      const intention = await getMessageIntention(message)

      if (intention == null) {
        res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
        return
      }

      console.log(intention)

      const data: UserIntetion = JSON.parse(intention)

      if (data.body == null) {
        res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
        return
      }

      switch (data.responseType) {
        case IntentionType.OFFER_SEARCH:
          // TODO Encapsulate this function
          if (data.body.country != null && (data.body.province == null || data.body.province == null) && !(await checkIfValidCountry(data.body.country))) {
            const country = await getCountryName(data.body.country)

            if (country == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            const { key } = (await getDictionaryList('country'))?.find(d => d.value.toLowerCase() === country.toLowerCase()) ?? { key: null }

            if (key == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            data.body.country = key
          } else if (data.body.province != null && data.body.city == null && !(await checkIfValidProvince(data.body.province))) {
            const country = await getCountryName(data.body.province)

            if (country == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            const { id } = (await getDictionaryList('country'))?.find(d => d.value.toLowerCase() === country.toLowerCase()) ?? { id: null }
            const provinceList = await getDictionaryList('province', String(id))

            if (provinceList == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            const validProvince = await getCorrectProvince(data.body.province, provinceList.map(p => p.key).join(','))

            if (validProvince == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            data.body.province = validProvince
          } else if (data.body.city != null && !(await checkIfValidCity(data.body.city))) {
            const country = await getCountryName(data.body.city)

            if (country == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            const { id } = (await getDictionaryList('country'))?.find(d => d.value.toLowerCase() === country.toLowerCase()) ?? { id: null }

            if (id == null) {
              res.status(500).json({ message: 'Tienes que especificar el pais o provincia', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            const cityList = await getDictionaryList('city', String(id))

            if (cityList == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            console.log(cityList)

            const validCity = await getCorrectCity(data.body.city, cityList?.map(p => p.key).join(','))

            if (validCity == null) {
              res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
              return
            }

            data.body.city = validCity
            delete data.body.province
          }

          const offers = await getOffers(data.body)

          if (offers == null) {
            res.status(500).json({ message: 'Internal server error', messageRole: MessageRole.ERROR, createdAt: new Date() })
            return
          }

          return res.json({ message: 'Success', offers, messageRole: MessageRole.BOT, createdAt: new Date(), responseType: IntentionType.OFFER_SEARCH })
        case IntentionType.INTRODUCTION:
          return res.json({ message: 'Success', text: data.message, messageRole: MessageRole.BOT, createdAt: new Date(), responseType: IntentionType.INTRODUCTION })
        case IntentionType.OFFER_DETAIL:
          const responseBody = { message: 'Success', offers: { items: [] } as any, text: data.message, messageRole: MessageRole.BOT, createdAt: new Date(), responseType: IntentionType.OFFER_DETAIL }
          for (const offerId of (data.body as any).offerIds) {
            if (typeof offerId !== 'string') continue

            const offer = await getOffer(offerId)

            if (offer == null) continue

            responseBody.offers.items.push(offer)
          }

          return res.json(responseBody)
      }

      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method ?? ''} Not Allowed`)
  }
}
