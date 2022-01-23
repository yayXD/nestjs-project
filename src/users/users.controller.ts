import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.entity';
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    //@Roles("admin")
    //@UseGuards(RolesGuard)
    @Get("getall")
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Set role' })
    @ApiResponse({ status: 200 })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'User page' })
    @ApiResponse({ status: 200 })
    @Get()
    getUserPage() {
        return this.usersService.getUserPage();
    }
}
