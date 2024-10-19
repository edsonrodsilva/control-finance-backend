// src/config/database.config.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { FinancialEntryOrmEntity } from 'src/core/financial-entries/infrastructure/financial-entry.entity.orm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'your_username',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'your_database',
  entities: [FinancialEntryOrmEntity],
  synchronize: true, // Use false em produção e gerencie migrações adequadamente
};
