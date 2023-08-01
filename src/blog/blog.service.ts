import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IBlogService } from './blog';
import { CreateBlogParams, CreateCommentParam } from 'src/utils/types';
import { BlogEntity } from 'src/entities/blog.entity';
import { Repositories } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { extname } from 'path';
import { LikeEntity } from 'src/entities/likes.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CommentEntity } from 'src/entities/comment.entity';
import { ReplyCommentEntity } from 'src/entities/reply-comment.entity';

@Injectable()
export class BlogService implements IBlogService {
  constructor(
    @Inject(Repositories.BLOG)
    private readonly blogRepository: Repository<BlogEntity>,
    @Inject(Repositories.LIKES)
    private readonly likeRepository: Repository<LikeEntity>,
    @Inject(Repositories.COMMENT)
    private readonly commentRepository: Repository<CommentEntity>,
    @Inject(Repositories.REPLY_COMMENT)
    private readonly replyCommentRepository: Repository<ReplyCommentEntity>,
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

  async getAll(): Promise<BlogEntity[]> {
    const blogs = await this.blogRepository.find({
      relations: [
        'comments',
        'likes',
        'comments.replies',
        'comments.replies.user',
      ],
    });

    return blogs;
  }

  async getBlogById(blogId: number): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['comments', 'likes'],
    });

    if (!blog) throw new BadRequestException('blog not exists');
    return blog;
  }

  async getBlogBySlug(slug: string): Promise<BlogEntity> {
    const blog = await this.blogRepository.findOne({ where: { slug } });

    return blog;
  }

  async likeToggleBlogById(
    blogId: number,
    user: UserEntity,
  ): Promise<LikeEntity> {
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
    });

    if (!blog) throw new NotFoundException('blog not founded');

    const findedLikeWithBlogId = await this.likeRepository.findOne({
      where: { blog, user },
    });

    if (!findedLikeWithBlogId) {
      const instanceLike = this.likeRepository.create({ blog, user });

      return this.likeRepository.save(instanceLike);
    }

    findedLikeWithBlogId.user = null;
    findedLikeWithBlogId.blog = null;

    return this.likeRepository.save(findedLikeWithBlogId);
  }

  async deleteBlogById(blogId: number): Promise<void> {
    await this.likeRepository.delete({ blog: { id: blogId } });
    await this.blogRepository.delete(blogId);
  }

  async createCommentForBlog(
    blogId: number,
    user: UserEntity,
    param: CreateCommentParam,
  ): Promise<CommentEntity> {
    const { content } = param;
    const blog = await this.blogRepository.findOne({ where: { id: blogId } });
    if (!blog) throw new NotFoundException('blog Not Found');

    const commentInstance = this.commentRepository.create({
      blog,
      user,
      content,
    });

    const savedComment = await this.commentRepository.save(commentInstance);

    return savedComment;
  }

  async createReplyCommnet(
    blogId: number,
    commentId: number,
    param: CreateCommentParam,
    user: UserEntity,
  ): Promise<ReplyCommentEntity> {
    const { content } = param;
    const blog = await this.blogRepository.findOne({
      where: { id: blogId },
      relations: ['comments'],
    });

    if (!blog) throw new NotFoundException('blog Not Found');

    const findMainComment = blog.comments.find((c) => c.id == commentId);

    const replyInstance = this.replyCommentRepository.create({
      comment: findMainComment,
      user,
      content,
    });

    const savedReplyComment = await this.replyCommentRepository.save(
      replyInstance,
    );

    return savedReplyComment;
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
