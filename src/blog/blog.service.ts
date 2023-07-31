import { Injectable } from '@nestjs/common';
import { IBlogService } from './blog';

@Injectable()
export class BlogService implements IBlogService {}
