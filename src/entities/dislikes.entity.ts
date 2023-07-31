import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BlogEntity } from './blog.entity';

@Entity()
export class DislikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BlogEntity, (blog) => blog.dislikes)
  blog: BlogEntity;
}
