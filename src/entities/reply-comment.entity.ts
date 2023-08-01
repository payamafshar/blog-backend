import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ReplyCommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  isAccepted: boolean;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies)
  @JoinColumn({ name: 'comment_id' })
  comment: CommentEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
