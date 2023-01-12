import {
  APIResponse,
  TrendClient,
  TrendSummary,
} from 'components/container/models/trend'
import axios, { AxiosInstance } from 'axios'
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

  index_summary(endpoint: string): Promise<APIResponse<TrendSummary[]>> {
    return this._cli.get(endpoint)
  }
}

export default TrendAPIClient
