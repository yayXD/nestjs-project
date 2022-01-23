import { Get, HttpException, HttpStatus, Injectable, UseGuards } from "@nestjs/common";
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from "./dto/add-role.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('user');
    user.roles = [role];
    await this.userRepository.save(user);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.find({ relations: ['roles'] });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if(role && user) {
        user.roles = [role];
        await this.userRepository.save(user);
        return dto;
    }

    throw new HttpException("Client or role not found", HttpStatus.NOT_FOUND);
  }

    getUserPage() {
        return "User page";
    }
}
