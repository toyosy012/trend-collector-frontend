import { injectable, inject, singleton } from 'tsyringe';
import { TrendClient, TrendSummary } from 'components/container/models/trend';

@singleton()
@injectable()
class TrendService {
  constructor(@inject('TrendClient') private client: TrendClient) {}

  indexSummary(endpoint: string): Promise<TrendSummary[]> {
    return this.client.indexSummary(endpoint);
  }
}

export default TrendService;
