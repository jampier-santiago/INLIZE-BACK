// Packages
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// Config
import { ROLES_SERVICES } from '../config/services';

// DTO's
import { CreateRoleDto } from 'apps/users-ws/src/roles/dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(ROLES_SERVICES) private readonly rolesClient: ClientProxy,
  ) {}

  @Post()
  createProduct(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesClient.send({ cmd: 'create_role' }, createRoleDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.rolesClient.send({ cmd: 'find_all_role' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
