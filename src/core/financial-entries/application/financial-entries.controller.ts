// src/core/financial-entries/application/financial-entries.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { FinancialEntriesService } from './financial-entries.service';
import { CreateFinancialEntryDto } from './dto/create-financial-entry.dto';
import { UpdateFinancialEntryDto } from './dto/update-financial-entry.dto';
import { FinancialEntry } from '../domain/financial-entry.entity';

@Controller('financial-entries')
export class FinancialEntriesController {
  constructor(
    private readonly financialEntriesService: FinancialEntriesService,
  ) {}

  @Post()
  async create(
    @Body() createDto: CreateFinancialEntryDto,
  ): Promise<FinancialEntry> {
    return this.financialEntriesService.create(createDto);
  }

  @Get()
  async findAll(): Promise<FinancialEntry[]> {
    return this.financialEntriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FinancialEntry> {
    return this.financialEntriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateFinancialEntryDto,
  ): Promise<FinancialEntry> {
    return this.financialEntriesService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.financialEntriesService.remove(id);
  }
}
