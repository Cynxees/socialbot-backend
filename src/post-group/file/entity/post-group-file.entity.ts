import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostGroupFileType } from '../enum/post-group-file-type.enum';
import { PostGroup } from 'src/post-group/entities/post-group.entity';
import { File } from 'src/file/entities/file.entity';

@Entity()
export class PostGroupFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  type: PostGroupFileType;

  @Column({ nullable: false })
  postGroupId: number;

  @OneToOne(() => PostGroup)
  @JoinColumn()
  postGroup: PostGroup;

  @Column({ nullable: false })
  fileId: number;

  @OneToOne(() => File)
  @JoinColumn()
  file: File;
}
