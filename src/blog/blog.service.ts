import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IBlogService } from './blog';
import { CreateBlogParams } from 'src/utils/types';
import { BlogEntity } from 'src/entities/blog.entity';
import { Repositories } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject(Repositories.BLOG)
    private readonly blogRepository: Repository<BlogEntity>,
    private readonly configService: ConfigService,
  ) {}

  async createBlog(
    createBlogParams: CreateBlogParams,
    file: Express.Multer.File,
  ): Promise<BlogEntity> {
    const { content, title, slug } = createBlogParams;

    const image = this.validateIncominImage(file);

    const instanceBlog = this.blogRepository.create({
      content,
      title,
      slug,
      image,
    });

    return this.blogRepository.save(instanceBlog);
  }

  validateIncominImage(file: Express.Multer.File) {
    let image: string;
    if (file) {
      const mimeTypes = ['.png', '.jpg', '.jpeg', '.webp', 'jfif'];
      const extName = extname(file.originalname);
      const url = this.configService.get('IMAGE_URL');
      if (!mimeTypes.includes(extName)) {
        throw new BadRequestException('فرمت ارسالی صحیح نمی باشد');
      }
      const imagePath = file?.path.replace(/\\/g, '/');
      image = `${url}/${imagePath}`;
      return image;
    }
    image = null;
    return image;
  }
}
