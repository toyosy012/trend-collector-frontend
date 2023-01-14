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

  indexSummary(endpoint: string): Promise<TrendSummary[]> {
    return this._cli
      .get<
        TrendAPIResponse<Summary[]>,
        TrendAPIResponse<Summary[]>,
        AxiosRequestConfig<RequestData>
      >(endpoint)
      .then((resp: TrendAPIResponse<Summary[]>) =>
        resp.data.result.map<TrendSummary>(
          (r: Summary) => new TrendSummary(r.id, r.name, r.updated_at),
        ),
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

export interface Summary {
  id: number
  name: string
  updated_at: string
}

export default TrendAPIClient
