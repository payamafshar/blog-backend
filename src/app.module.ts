import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BlogModule } from './blog/blog.module';
import { join } from 'path';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    BlogModule,
    MailerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads'),
      serveRoot: '/uploads/',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
