import { injectable, inject, singleton } from 'tsyringe';
import {
  ErrorResponse,
  TrendClient,
  TrendSummary,
} from 'components/container/models/trend';
import { Either } from 'fp-ts/lib/Either';

@singleton()
@injectable()
class TrendService {
  constructor(@inject('TrendClient') private client: TrendClient) {}

  indexSummary(
    endpoint: string,
  ): Promise<Either<ErrorResponse, TrendSummary[]>> {
    return this.client.indexSummary(endpoint);
  }
}

export default TrendService;
