import { PostGroup } from 'src/post-group/entities/post-group.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ default: false })
  published: boolean;

  @Column({ nullable: true  })
  url: string;

  @Column('text', { array: true })
  tags: string[];

  @Column('text', { array: true })
  hashtags: string[];

  @Column({ nullable: true })
  postGroupId?: number;

  @JoinColumn()
  postGroup?: PostGroup;
}
