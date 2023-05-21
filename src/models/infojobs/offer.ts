/**
 * https://developer.infojobs.net/documentation/operation/offer-list-9.xhtml
 */
export interface JobsOfferQuery {
  q?: string
  province?: string
  category?: string
  subcategory?: string
  city?: string
  country?: string
  salaryMin?: string
  salaryPeriod?: string
  study?: string
  contactType?: string
  experienceMin?: string
  workday?: string
  employerId?: string
  emph?: string
  order?: string
  page?: string
  maxResults?: string
  facets?: string
  sinceDate?: string
  teleworking?: string
}

export interface JobOffer {
  currentPage: number
  pageSize: number
  totalResults: number
  currentResults: number
  totalPages: number
  availableSortingMethods: string[]
  sortBy: string
  sinceDate: string
  items: Item[]
}

export interface Item {
  id: string
  title: string
  province: Category
  city: string
  link: string
  category: Category
  contractType: Category
  subcategory: Category
  salaryMin: Category
  salaryMax: Category
  salaryPeriod: Category
  experienceMin: Category
  workDay: Category
  study: Category
  teleworking: Category
  published: Date
  updated: Date
  author: Author
  requirementMin: string
  bold: boolean
  applications: string
  subSegment: number
  executive: boolean
  salaryDescription: string
  multiProvince: boolean
  urgent: boolean
  color: boolean
}

export interface Author {
  id: string
  privateId: number
  name: string
  uri: string
  corporateResponsive: boolean
  showCorporativeHeader: boolean
}

export interface Category {
  id: number
  value: string
}
