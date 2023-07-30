import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATA_SOURCE_TOKEN } from 'src/utils/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: DATA_SOURCE_TOKEN,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: configService.get<'postgres' | 'mysql'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        password: configService.get<string>('DB_PASSWORD'),
        username: configService.get<string>('DB_USERNAME'),
        database: configService.get<string>('DB_DATABASENAME'),
        entities: [__dirname + '/../**/**/entities/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
