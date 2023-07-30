import { UserEntity } from 'src/entities/user.entity';
import { DATA_SOURCE_TOKEN, Repositories } from 'src/utils/constants';
import { DataSource } from 'typeorm';

export const authProvider = [
  {
    provide: Repositories.USER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE_TOKEN],
  },
];
