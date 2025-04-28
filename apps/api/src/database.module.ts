import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProvider } from './providers/database.provider';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {
}
