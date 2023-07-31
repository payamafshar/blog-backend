import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity()
export class ReplyCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies)
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;
}
