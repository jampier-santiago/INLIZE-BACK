import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateUserDto } from 'apps/users-ws/src/users/dto/create-user.dto';
import { UpdateUserDto } from 'apps/users-ws/src/users/dto/update-user.dto';

// Config
import { USERS_SERVICES } from '../config/services';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICES) private readonly usersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send({ cmd: 'create_user' }, createUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.usersClient.send({ cmd: 'find_all_users' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersClient.send({ cmd: 'find_one_user' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersClient
      .send({ cmd: 'update_user' }, { ...updateUserDto, id })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersClient.send({ cmd: 'remove_user' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
