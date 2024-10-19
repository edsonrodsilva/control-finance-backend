import { PartialType } from '@nestjs/mapped-types';
import { CreateFinancialEntryDto } from './create-financial-entry.dto';

export class UpdateFinancialEntryDto extends PartialType(
  CreateFinancialEntryDto,
) {}
