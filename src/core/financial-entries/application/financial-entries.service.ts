// src/core/financial-entries/application/financial-entries.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { FinancialEntryRepository } from '../infrastructure/financial-entry.repository';
import { CreateFinancialEntryDto } from './dto/create-financial-entry.dto';
import { UpdateFinancialEntryDto } from './dto/update-financial-entry.dto';
import { FinancialEntry, EntryStatus } from '../domain/financial-entry.entity';

@Injectable()
export class FinancialEntriesService {
  constructor(private readonly repository: FinancialEntryRepository) {}

  async create(createDto: CreateFinancialEntryDto): Promise<FinancialEntry> {
    const entry = new FinancialEntry(
      createDto.entryType,
      createDto.amount,
      createDto.currency,
      createDto.accountId,
      createDto.entry_date,
      createDto.category,
      createDto.tags,
      createDto.created_by,
      createDto.description,
      createDto.subcategory,
      createDto.status as EntryStatus,
    );
    return this.repository.create(entry);
  }

  async findAll(): Promise<FinancialEntry[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<FinancialEntry> {
    const entry = await this.repository.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Financial Entry with ID ${id} not found`);
    }
    return entry;
  }

  async update(
    id: number,
    updateDto: UpdateFinancialEntryDto,
  ): Promise<FinancialEntry> {
    const entry = await this.findOne(id);

    // Atualizar propriedades conforme o DTO
    if (updateDto.entryType) entry.entryType = updateDto.entryType;
    if (updateDto.amount) entry.updateAmount(updateDto.amount);
    if (updateDto.currency) entry.currency = updateDto.currency;
    if (updateDto.description !== undefined)
      entry.description = updateDto.description;
    if (updateDto.accountId) entry.accountId = updateDto.accountId;
    if (updateDto.entry_date) entry.entryDate = updateDto.entry_date;
    if (updateDto.status) entry.status = updateDto.status as EntryStatus;
    if (updateDto.category) entry.category = updateDto.category;
    if (updateDto.subcategory !== undefined)
      entry.subcategory = updateDto.subcategory;
    if (updateDto.tags) entry.tags = updateDto.tags;

    entry.updatedAt = new Date();

    return this.repository.update(id, entry);
  }

  async remove(id: number): Promise<void> {
    const entry = await this.findOne(id);
    if (!entry) {
      throw new NotFoundException(`Financial Entry with ID ${id} not found`);
    }
    await this.repository.delete(id);
  }
}
