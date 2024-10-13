import { PostGroup } from 'src/post-group/entities/post-group.entity';
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ default: false })
  published: boolean;

  @Column('simple-array', { default: [] })
  tags: string[];

  @Column('simple-array', { default: [] })
  hashtags: string[];

  @Column({ nullable: true })
  postGroupId?: number;

  @JoinColumn()
  postGroup?: PostGroup;
}
