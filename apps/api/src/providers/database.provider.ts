import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProvider = [
  {
    provide: 'DB_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> =>
      mongoose.connect(configService.get('DB_HOST'), {
        dbName: configService.get('DB_NAME'),
        user: configService.get('DB_USER'),
        pass: configService.get('DB_PASSWORD'),
      }),
  },
];
