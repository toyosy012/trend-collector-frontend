import {
  DomainError,
  ErrorResponse,
  SystemError,
  TrendClient,
  TrendSummary,
} from 'components/container/models/trend';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { singleton } from 'tsyringe';
import { Either, left, right } from 'fp-ts/lib/Either';

@singleton()
class TrendAPIClient implements TrendClient {
  private _cli: AxiosInstance;

  constructor() {
    this._cli = axios.create({
      baseURL: `http://localhost:8000`,
      timeout: 15000,
    });

    // インスタンス初期化時にインターセプター処理を渡せなさそう
    this._cli.interceptors.response.use(
      (response) => response,
      (e: AxiosError<APIErrorResponse>) =>
        Promise.reject(
          e.response
            ? new DomainError(
                e.response.data.message,
                e.response.data.request_id,
              )
            : new SystemError(e.message),
        ),
    );
  }

  indexSummary(
    endpoint: string,
  ): Promise<Either<ErrorResponse, TrendSummary[]>> {
    return this._cli
      .get(endpoint)
      .then((resp: TrendAPIResponse<Summary[]>) =>
        right<ErrorResponse, TrendSummary[]>(
          resp.data.result.map<TrendSummary>(
            (r: Summary) => new TrendSummary(r.id, r.name, r.updated_at),
          ),
        ),
      )
      .catch((e: ErrorResponse) => left(e));
  }
}

export interface TrendAPIResponse<T> {
  data: Data<T>;
}

interface Data<T> {
  result: T;
}

export interface Summary {
  id: number;
  name: string;
  updated_at: string;
}

export interface APIErrorResponse {
  message: string;
  request_id: string;
}

export default TrendAPIClient;
