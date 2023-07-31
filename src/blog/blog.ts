import { BlogEntity } from 'src/entities/blog.entity';
import { LikeEntity } from 'src/entities/likes.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CreateBlogParams } from 'src/utils/types';

export interface IBlogService {
  createBlog(
    createBlogParams: CreateBlogParams,
    file: Express.Multer.File,
  ): Promise<BlogEntity>;
  getAll(): Promise<BlogEntity[]>;

  getBlogById(blogId: number): Promise<BlogEntity>;

  getBlogBySlug(slug: string): Promise<BlogEntity>;

  likeToggleBlogById(blogId: number, user: UserEntity): Promise<LikeEntity>;
}
