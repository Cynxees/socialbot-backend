import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TestPostGroup {
  @PrimaryGeneratedColumn()
  cok: number;
}