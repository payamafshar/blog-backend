import {
  Controller,
  Post,
  Inject,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { CreateBlogDto } from './dtos/createblog.dto';
import { IBlogService } from './blog';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/utils/decorators';
import { UserEntity } from 'src/entities/user.entity';

@Controller(Routes.BLOG)
export class BlogController {
  constructor(
    @Inject(Services.BLOG) private readonly blogService: IBlogService,
  ) {}
  @Post('createBlog')
  @UseInterceptors(FileInterceptor('file'))
  createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blogService.createBlog(createBlogDto, file);
  }

  @Get('getAll')
  getAllBlogs() {
    return this.blogService.getAll();
  }

  @Get('/:blogId')
  getBlogById(@Param('blogId', ParseIntPipe) blogId: number) {
    return this.blogService.getBlogById(blogId);
  }

  @Get('/:slug')
  getBlogBySlug(@Param('slug') slug: string) {
    return this.blogService.getBlogBySlug(slug);
  }

  @Post('like/:blogId')
  likeBlogBydId(
    @Param('blogId', ParseIntPipe) blogId: number,
    @AuthUser() user: UserEntity,
  ) {
    return this.blogService.likeToggleBlogById(blogId, user);
  }

  @Delete('/:blogId')
  deleteBlogById(@Param('blogId', ParseIntPipe) blogId: number) {
    return this.blogService.deleteBlogById(blogId);
  }
}
