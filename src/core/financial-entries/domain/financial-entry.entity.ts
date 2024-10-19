// src/core/financial-entries/domain/financial-entry.entity.ts

export type EntryStatus = 'pending' | 'completed' | 'cancelled';

export class FinancialEntry {
  private _id: number;
  private _entryType: string;
  private _amount: number;
  private _currency: string;
  private _description?: string;
  private _accountId: number;
  private _entryDate: Date;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _status: EntryStatus;
  private _category: string;
  private _subcategory?: string;
  private _tags: string[];
  private _createdBy: number;

  constructor(
    entryType: string,
    amount: number,
    currency: string,
    accountId: number,
    entryDate: Date,
    category: string,
    tags: string[],
    createdBy: number,
    description?: string,
    subcategory?: string,
    status: EntryStatus = 'pending',
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    id?: number,
  ) {
    this._id = id;
    this.entryType = entryType;
    this.amount = amount;
    this.currency = currency;
    this.description = description;
    this.accountId = accountId;
    this.entryDate = entryDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
    this.category = category;
    this.subcategory = subcategory;
    this.tags = tags;
    this.createdBy = createdBy;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get entryType(): string {
    return this._entryType;
  }

  get amount(): number {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  get description(): string | undefined {
    return this._description;
  }

  get accountId(): number {
    return this._accountId;
  }

  get entryDate(): Date {
    return this._entryDate;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get status(): EntryStatus {
    return this._status;
  }

  get category(): string {
    return this._category;
  }

  get subcategory(): string | undefined {
    return this._subcategory;
  }

  get tags(): string[] {
    return this._tags;
  }

  get createdBy(): number {
    return this._createdBy;
  }

  // Setters com validações
  set entryType(value: string) {
    if (!value) {
      throw new Error('entryType é obrigatório');
    }
    this._entryType = value;
  }

  set amount(value: number) {
    if (value <= 0) {
      throw new Error('amount deve ser maior que zero');
    }
    this._amount = value;
  }

  set currency(value: string) {
    if (!value || value.length !== 3) {
      throw new Error('currency deve ter exatamente 3 caracteres');
    }
    this._currency = value.toUpperCase();
  }

  set description(value: string | undefined) {
    this._description = value;
  }

  set accountId(value: number) {
    if (value <= 0) {
      throw new Error('accountId deve ser um número positivo');
    }
    this._accountId = value;
  }

  set entryDate(value: Date) {
    if (!(value instanceof Date) || isNaN(value.getTime())) {
      throw new Error('entryDate deve ser uma data válida');
    }
    this._entryDate = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  set status(value: EntryStatus) {
    const validStatuses: EntryStatus[] = ['pending', 'completed', 'cancelled'];
    if (!validStatuses.includes(value)) {
      throw new Error(
        `status deve ser um dos seguintes valores: ${validStatuses.join(', ')}`,
      );
    }
    this._status = value;
  }

  set category(value: string) {
    if (!value) {
      throw new Error('category é obrigatório');
    }
    this._category = value;
  }

  set subcategory(value: string | undefined) {
    this._subcategory = value;
  }

  set tags(value: string[]) {
    if (!Array.isArray(value)) {
      throw new Error('tags deve ser um array de strings');
    }
    this._tags = value;
  }

  set createdBy(value: number) {
    if (value <= 0) {
      throw new Error('createdBy deve ser um número positivo');
    }
    this._createdBy = value;
  }

  markAsCompleted() {
    this.status = 'completed';
    this.updatedAt = new Date();
  }

  markAsCancelled() {
    this.status = 'cancelled';
    this.updatedAt = new Date();
  }

  updateAmount(newAmount: number) {
    this.amount = newAmount;
    this.updatedAt = new Date();
  }

  // Outros métodos de negócio podem ser adicionados aqui
}
