import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PostGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  scheduledDate: Date;

  @Column({ default: false })
  isPublished: boolean;

  @Column("int", { array: true, default: [] })
  fileIds: number[];

  @Column("int", { array: true })
  postIds: number[];

  @Column({ nullable: true })
  musicId?: number;
}