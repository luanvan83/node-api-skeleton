import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './UserEntity';

@Entity('user_feedbacks')
export class UserFeedback {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.feedbacks)
  @JoinColumn({
    name: "user_id",   // foreign key
  })
  user!: User;

  @Column()
  content!: string;
}