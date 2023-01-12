export interface TrendSummary {
  id: number
  name: string
  updated_at: string
}

export interface TrendClient {
  index_summary(endpoint: string): Promise<APIResponse<TrendSummary[]>>
}

export interface APIResponse<T> {
  data: Data<T>
}

interface Data<T> {
  result: T
}
