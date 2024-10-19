// src/core/financial-entries/infrastructure/financial-entry.repository.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinancialEntryOrmEntity } from './financial-entry.entity.orm';
import { EntryStatus, FinancialEntry } from '../domain/financial-entry.entity';

@Injectable()
export class FinancialEntryRepository {
  constructor(
    @InjectRepository(FinancialEntryOrmEntity)
    private readonly repository: Repository<FinancialEntryOrmEntity>,
  ) {}

  // Converter de entidade ORM para entidade de domínio
  private toDomain(entity: FinancialEntryOrmEntity): FinancialEntry {
    return new FinancialEntry(
      entity.entryType,
      Number(entity.amount),
      entity.currency,
      entity.accountId,
      entity.entry_date,
      entity.category,
      entity.tags,
      entity.created_by,
      entity.description,
      entity.subcategory,
      entity.status as EntryStatus,
      entity.created_at,
      entity.updated_at,
      entity.id,
    );
  }

  // Converter de entidade de domínio para entidade ORM
  private toOrm(domain: FinancialEntry): FinancialEntryOrmEntity {
    const orm = new FinancialEntryOrmEntity();
    orm.id = domain.id;
    orm.entryType = domain.entryType;
    orm.amount = domain.amount;
    orm.currency = domain.currency;
    orm.description = domain.description;
    orm.accountId = domain.accountId;
    orm.entry_date = domain.entryDate;
    orm.created_at = domain.createdAt;
    orm.updated_at = domain.updatedAt;
    orm.status = domain.status;
    orm.category = domain.category;
    orm.subcategory = domain.subcategory;
    orm.tags = domain.tags;
    orm.created_by = domain.createdBy;
    return orm;
  }

  async create(domain: FinancialEntry): Promise<FinancialEntry> {
    const orm = this.toOrm(domain);
    const savedOrm = await this.repository.save(orm);
    return this.toDomain(savedOrm);
  }

  async findAll(): Promise<FinancialEntry[]> {
    const ormEntries = await this.repository.find();
    return ormEntries.map(this.toDomain);
  }

  async findOne(id: number): Promise<FinancialEntry> {
    const orm = await this.repository.findOneBy({ id });
    if (!orm) {
      return null;
    }
    return this.toDomain(orm);
  }

  async update(id: number, domain: FinancialEntry): Promise<FinancialEntry> {
    await this.repository.update(id, this.toOrm(domain));
    const updatedOrm = await this.repository.findOneBy({ id });
    return this.toDomain(updatedOrm);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
