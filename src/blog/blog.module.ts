import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Services } from 'src/utils/constants';
import {
  blogProvider,
  commentProvider,
  dislikesProvider,
  likesProvider,
  replyCommentProvider,
} from './blog.providers';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
    ...dislikesProvider,
    ...commentProvider,
    ...replyCommentProvider,
    {
      provide: Services.BLOG,
      useClass: BlogService,
    },
  ],
})
export class BlogModule {}
