import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Services } from 'src/utils/constants';
import { authProvider } from './auth.provider';
import { DatabaseModule } from 'src/database/database.module';
import AuthWithCookie from './middlewares/authWithCookie';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [
    ...authProvider,
    {
      provide: Services.AUTH,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthWithCookie).forRoutes(
      {
        path: 'auth/status',
        method: RequestMethod.GET,
      },
      {
        path: 'auth/logout',
        method: RequestMethod.POST,
      },
    );
  }
}
