import { BlogEntity } from 'src/entities/blog.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { LikeEntity } from 'src/entities/likes.entity';
import { ReplyCommentEntity } from 'src/entities/reply-comment.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateBlogParams, CreateCommentParam } from 'src/utils/types';

export interface IBlogService {
  createBlog(
    createBlogParams: CreateBlogParams,
    file: Express.Multer.File,
  ): Promise<BlogEntity>;
  getAll(): Promise<BlogEntity[]>;

  getBlogById(blogId: number): Promise<BlogEntity>;

  getBlogBySlug(slug: string): Promise<BlogEntity>;

  likeToggleBlogById(blogId: number, user: UserEntity): Promise<LikeEntity>;

  deleteBlogById(blogId: number): void;

  createCommentForBlog(
    blogId: number,
    user: UserEntity,
    param: CreateCommentParam,
  ): Promise<CommentEntity>;

  createReplyCommnet(
    blogId: number,
    commentId: number,
    param: CreateCommentParam,
    user: UserEntity,
  ): Promise<ReplyCommentEntity>;

  acceptCommentByAdmin(commnetId: number): void;

  acceptReplyCommentByAdmin(reolyId: number): void;
}
