import { MediaType } from 'src/common/enums/media-type.enums';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: false})
  key: string;

  @Column({nullable: false})
  mediaType: MediaType;

  @Column({nullable: true})
  ownerId?: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'ownerId'})
  owner: User;
}
