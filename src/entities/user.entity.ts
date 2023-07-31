import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  mobile: number;

  @Column()
  otpCode: number;

  @Column({ type: 'bigint' })
  otpExpiresin: number;

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
