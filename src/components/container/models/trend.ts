export class TrendSummary {
  constructor(
    private readonly _id: number,
    private readonly _name: string,
    private readonly _updatedAt: string,
  ) {}

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get updatedAt(): string {
    return this._updatedAt
  }
}

export interface TrendClient {
  indexSummary(endpoint: string): Promise<TrendSummary[]>
}
