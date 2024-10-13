import { Token } from 'src/common/enums/token.enums';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GoogleUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @Column('simple-array')
  scopes: string[];

  @Column({
    type: 'enum',
    enum: Token,
  })
  tokenType: Token;

  @Column()
  expiresIn: Date;
}
