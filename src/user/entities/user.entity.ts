import { TiemstampEntity } from 'src/generics/tiemstamp.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoleEnum {
  admin = 'ROLE:ADMIN',
  user = 'ROLE:USER',
}

@Entity()
export class User extends TiemstampEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100, unique: true })
  username: string;
  @Column({ length: 100, unique: true })
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column()
  role: UserRoleEnum;
}
