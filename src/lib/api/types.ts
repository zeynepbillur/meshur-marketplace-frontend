// Backend’den gelen ham veri (API contract)
export type ApiProduct = {
  id: string
  slug: string
  title: {
    tr: string
    en: string
  }
  description?: {
    tr?: string
    en?: string
  }
  category?: string
  price: number
  rating?: number
  stock?: number
  image: string
}

// REST response wrapper
export type ApiResponse<T> = {
  data: T
  meta?: {
    total?: number
    page?: number
  }
}
