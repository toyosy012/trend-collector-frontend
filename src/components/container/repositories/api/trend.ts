import { TrendClient, TrendSummary } from 'components/container/models/trend'
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios'
import { singleton } from 'tsyringe'

@singleton()
class TrendAPIClient implements TrendClient {
  private readonly _cli: AxiosInstance

  constructor() {
    this._cli = axios.create({
      baseURL: `http://localhost:8000`,
      timeout: 15000,
    })
  }

  async indexSummary(endpoint: string): Promise<TrendSummary[]> {
    const result = await this._cli.get<
      TrendAPIResponse<TrendSummaryResponse[]>,
      TrendAPIResponse<TrendSummaryResponse[]>,
      AxiosRequestConfig<RequestData>
    >(endpoint)
    return result.data.result.map<TrendSummary>(
      (r: TrendSummaryResponse) => new TrendSummary(r.id, r.name, r.updated_at),
    )
  }
}

interface RequestData {
  header: AxiosHeaders
}

export interface TrendAPIResponse<T> {
  data: Data<T>
}

interface Data<T> {
  result: T
}

export interface TrendSummaryResponse {
  id: number
  name: string
  updated_at: string
}

export default TrendAPIClient
