// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialEntriesModule } from './core/financial-entries/financial-entries.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    FinancialEntriesModule,
    // Outros módulos...
  ],
})
export class AppModule {}
