import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateUserDto } from 'apps/users-ws/src/users/dto/create-user.dto';
import { UpdateUserDto } from 'apps/users-ws/src/users/dto/update-user.dto';

// Guards
import { RolesGuard } from 'utils/guards/roles/roles.guard';

// Config
import { USERS_SERVICES } from '../config/services';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICES) private readonly usersClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersClient.send({ cmd: 'create_user' }, createUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  findAll() {
    return this.usersClient.send({ cmd: 'find_all_users' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.usersClient.send({ cmd: 'find_one_user' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  remove(@Param('id') id: string) {
    return this.usersClient.send({ cmd: 'remove_user' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
