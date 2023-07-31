import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { UserEntity } from './user.entity';

@Entity()
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => BlogEntity, (blog) => blog.likes)
  blog: BlogEntity;

  @ManyToOne(() => UserEntity, (user) => user.likes)
  user: UserEntity;
}
