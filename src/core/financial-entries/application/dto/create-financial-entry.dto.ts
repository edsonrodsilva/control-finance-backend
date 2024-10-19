import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  IsOptional,
  IsArray,
  IsNotEmpty,
} from 'class-validator';

export class CreateFinancialEntryDto {
  @IsString()
  @IsNotEmpty()
  entryType: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  accountId: number;

  @IsDate()
  @IsNotEmpty()
  entry_date: Date;

  @IsEnum(['pending', 'completed', 'cancelled'])
  @IsNotEmpty()
  status: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  subcategory?: string;

  @IsArray()
  tags: string[];

  @IsNumber()
  @IsNotEmpty()
  created_by: number;
}
