import { BlogEntity } from 'src/entities/blog.entity';
import { CreateBlogParams } from 'src/utils/types';

export interface IBlogService {
  createBlog(
    createBlogParams: CreateBlogParams,
    file: Express.Multer.File,
  ): Promise<BlogEntity>;
}
