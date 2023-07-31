import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity()
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BlogEntity, (blog) => blog.likes)
  blog: BlogEntity;
}
