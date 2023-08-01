import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BlogEntity } from './blog.entity';
import { ReplyCommentEntity } from './reply-comment.entity';
import { UserEntity } from './user.entity';

@Entity()
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true, default: false })
  isAccepted: boolean;

  @ManyToOne(() => BlogEntity, (blog) => blog.comments)
  @JoinColumn({ name: 'blog_id' })
  blog: BlogEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => ReplyCommentEntity, (reply) => reply.comment)
  replies: ReplyCommentEntity[];
}
