export type DictionaryId = 'province' | 'country' | 'city'

export interface Dictionary {
  id: number
  value: string
  order: number
  key: string
  parent: number
}

declare module 'extract-json-from-string' {
  export default function JSONExtract (str: string): string
}
