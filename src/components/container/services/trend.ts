import { injectable, inject, singleton } from 'tsyringe'
import {
  APIResponse,
  TrendClient,
  TrendSummary,
} from 'components/container/models/trend'

@singleton()
@injectable()
class TrendService {
  constructor(@inject('TrendClient') private client: TrendClient) {}

  index_summary(endpoint: string): Promise<APIResponse<TrendSummary[]>> {
    return this.client.index_summary(endpoint)
  }
}

export default TrendService
