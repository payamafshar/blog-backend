import {
  Controller,
  Post,
  Inject,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { CreateBlogDto } from './dtos/createblog.dto';
import { IBlogService } from './blog';
import { FileInterceptor } from '@nestjs/platform-express';

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
}
