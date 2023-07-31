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

@Module({
  imports: [DatabaseModule],
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
