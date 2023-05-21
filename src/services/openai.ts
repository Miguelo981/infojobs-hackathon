import { Configuration, OpenAIApi, ChatCompletionRequestMessageRoleEnum } from 'openai'
import { OPENAI_REQUEST_INTENTION_SCHEMA, OPENAI_RESPONSE_FORMAT, TEST_OPENAI_REQUEST, TEST_OPENAI_RESPONSE } from '@/constants'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)
const openaiConfig = {
  model: 'gpt-3.5-turbo',
  temperature: 0.9,
  max_tokens: 750,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}

export async function getMessageIntention (message: string): Promise<string | null> {
  // TODO avoid prompt injection and timeout
  try {
    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You are an Infojobs's job finder assistant. You will interpretate user messages and return a response type depending of user's intention. 
          ${OPENAI_REQUEST_INTENTION_SCHEMA}
          ${OPENAI_RESPONSE_FORMAT}`
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: TEST_OPENAI_REQUEST
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: TEST_OPENAI_RESPONSE
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: message
      }
    ]

    const { data } = await openai.createChatCompletion({
      ...openaiConfig,
      messages
    })

    const [choice] = data.choices

    if (!choice) return null

    return choice.message.content
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getCountryName (placeName: string): Promise<string | null> {
  try {
    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: 'You will recieve a province or city name in Spanish. You will just return the country name in Spanish.'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'tenerife'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'España'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'a coruña'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'España'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: placeName
      }
    ]

    const { data } = await openai.createChatCompletion({
      ...openaiConfig,
      messages
    })

    const [choice] = data.choices

    if (!choice) return null

    return choice.message.content
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getCorrectProvince (province: string, provinceList: string): Promise<string | null> {
  try {
    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You will recieve a province and you have to return the valid key for that province from the list I am giving you: ${provinceList}`
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'tenerife'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'santa-cruz-de-tenerife'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'Vizcaya'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'vizcaya-bizkaia'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'baleares'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'illes-balears'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: province
      }
    ]

    const { data } = await openai.createChatCompletion({
      ...openaiConfig,
      messages
    })

    const [choice] = data.choices

    if (!choice) return null

    return choice.message.content
  } catch (err) {
    console.log(err)
    return null
  }
}

export async function getCorrectCity (city: string, cityList: string): Promise<string | null> {
  try {
    const messages = [
      {
        role: ChatCompletionRequestMessageRoleEnum.System,
        content: `You will recieve a city and you have to return the valid key for that city from the list I am giving you: ${cityList}`
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'segovia'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'san-cristobal-de-segovia'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'Villavicencio'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'villavicencio-de-los-caballeros'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: 'Castilruiz'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: 'castilruiz'
      },
      {
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: city
      }
    ]

    const { data } = await openai.createChatCompletion({
      ...openaiConfig,
      messages
    })

    const [choice] = data.choices

    if (!choice) return null

    return choice.message.content
  } catch (err) {
    console.log(err)
    return null
  }
}
