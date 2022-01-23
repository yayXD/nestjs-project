import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.entity';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: '1', description: 'Index' })
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @ApiProperty({ example: 'qwerty123@gnidus.com', description: 'Email' })
  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @ApiProperty({ example: '123123', description: 'Password' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @ManyToMany(() => Role, (role: Role) => role.users)
  @JoinTable()
  roles: Role[];
}
