// src/core/financial-entries/financial-entries.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialEntryOrmEntity } from './infrastructure/financial-entry.entity.orm';
import { FinancialEntryRepository } from './infrastructure/financial-entry.repository';
import { FinancialEntriesService } from './application/financial-entries.service';
import { FinancialEntriesController } from './application/financial-entries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialEntryOrmEntity])],
  controllers: [FinancialEntriesController],
  providers: [FinancialEntriesService, FinancialEntryRepository],
})
export class FinancialEntriesModule {}
