import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LikeEntity } from './likes.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => CommentEntity, (comment) => comment.blog)
  comments: CommentEntity[];

  @OneToMany(() => LikeEntity, (like) => like.blog, { cascade: true })
  likes: LikeEntity[];
}

// @OneToMany(() => DislikeEntity, (dislike) => dislike.blog)
//   dislikes: DislikeEntity[];
