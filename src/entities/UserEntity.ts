import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserFeedback } from './UserFeedbackEntity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column()
  nickname!: string;

  @Column()
  email!: string;

  @OneToMany(() => UserFeedback, (feedback) => feedback.user)
  feedbacks!: Promise<UserFeedback[]>;
}