import {
  APIResponse,
  TrendClient,
  TrendSummary,
} from 'components/container/models/trend'
import axios, { AxiosInstance } from 'axios'

class TrendAPIClient implements TrendClient {
  private static _instance: TrendAPIClient

  private readonly _cli: AxiosInstance

  constructor() {
    this._cli = axios.create({
      baseURL: `http://localhost:8000`,
      timeout: 15000,
    })
  }

  public static instance(): TrendAPIClient {
    if (!this._instance) {
      this._instance = new TrendAPIClient()
    }
    return this._instance
  }

  index_summary(endpoint: string): Promise<APIResponse<TrendSummary[]>> {
    return this._cli.get(endpoint)
  }
}

export default TrendAPIClient
