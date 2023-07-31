import { BlogEntity } from 'src/entities/blog.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { LikeEntity } from 'src/entities/likes.entity';
import { ReplyCommentEntity } from 'src/entities/reply-comment.entity';
import { DATA_SOURCE_TOKEN, Repositories } from 'src/utils/constants';
import { DataSource } from 'typeorm';

export const blogProvider = [
  {
    provide: Repositories.BLOG,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(BlogEntity),
    inject: [DATA_SOURCE_TOKEN],
  },
];
export const commentProvider = [
  {
    provide: Repositories.COMMENT,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CommentEntity),
    inject: [DATA_SOURCE_TOKEN],
  },
];

export const likesProvider = [
  {
    provide: Repositories.LIKES,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LikeEntity),
    inject: [DATA_SOURCE_TOKEN],
  },
];
export const replyCommentProvider = [
  {
    provide: Repositories.REPLY_COMMENT,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReplyCommentEntity),
    inject: [DATA_SOURCE_TOKEN],
  },
];
