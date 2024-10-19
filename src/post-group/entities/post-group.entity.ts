import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../post/entities/post.entity';

@Entity()
export class PostGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  scheduledDate: Date;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ nullable: false })
  authorId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Post, (post) => post.postGroupId)
  posts: Post[];
}
