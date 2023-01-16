import { Either } from 'fp-ts/lib/Either';

export class TrendSummary {
  constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _updatedAt: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }
}

export interface ErrorResponse {
  get message(): string | undefined;
}

export class SystemError implements ErrorResponse {
  constructor(private readonly _message: string | undefined) {}

  get message(): string | undefined {
    return this._message;
  }
}

export class DomainError implements ErrorResponse {
  constructor(
    private readonly _message: string,
    private readonly _requestID: string,
  ) {}

  get message(): string {
    return `${this._message}, Request ID: ${this._requestID}`;
  }
}

export interface TrendClient {
  indexSummary(
    endpoint: string,
  ): Promise<Either<ErrorResponse, TrendSummary[]>>;
}
