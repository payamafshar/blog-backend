import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Services } from 'src/utils/constants';
import {
  blogProvider,
  commentProvider,
  likesProvider,
  replyCommentProvider,
} from './blog.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import AuthWithCookie from 'src/auth/middlewares/authWithCookie';
import { AuthModule } from 'src/auth/auth.module';
import { authProvider } from 'src/auth/auth.provider';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      dest: './uploads',
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },

      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  ],
  controllers: [BlogController],
  providers: [
    ...blogProvider,
    ...likesProvider,
    ...commentProvider,
    ...replyCommentProvider,
    ...authProvider,
    {
      provide: Services.BLOG,
      useClass: BlogService,
    },
  ],
})
export class BlogModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthWithCookie).forRoutes({
      path: 'blog/like/:blogId',
      method: RequestMethod.POST,
    });
  }
}
