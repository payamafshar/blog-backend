import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
