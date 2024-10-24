import { Token } from 'src/common/enums/token.enums';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class GoogleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column('text', { array: true })
  scopes: string[];

  @Column({
    type: 'enum',
    enum: Token,
  })
  tokenType: Token;

  @Column()
  expiresIn: Date;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
