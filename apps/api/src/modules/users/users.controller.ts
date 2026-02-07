import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { UserRole } from '@prisma/client';

class CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  organizationId: string;
}

class UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create({
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      role: createUserDto.role || 'PRODUCTION_SUPERVISOR',
      organization: {
        connect: { id: createUserDto.organizationId },
      },
    });

    const { password, ...result } = user;
    return { success: true, data: result };
  }

  @Get()
  async findAll(@Query('organizationId') organizationId?: string) {
    const users = await this.usersService.findAll(organizationId);
    const sanitizedUsers = users.map(({ password, ...user }) => user);
    return { success: true, data: sanitizedUsers };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    const { password, ...result } = user;
    return { success: true, data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    const { password, ...result } = user;
    return { success: true, data: result };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { success: true, message: 'User deleted successfully' };
  }
}
