import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Role } from '../roles/roles.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      TypeOrmModule.forFeature([User, Role]),
      RolesModule,
      forwardRef(() => AuthModule)
  ],
  exports: [
      TypeOrmModule,
      UsersService
  ],
})
export class UsersModule {}
