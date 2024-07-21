// Packages
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { catchError } from 'rxjs';

// Config
import { ROLES_SERVICES } from '../config/services';

// DTO's
import { CreateRoleDto } from 'apps/users-ws/src/roles/dto/create-role.dto';

// Utils
import { RolesGuard } from 'utils/guards/roles/roles.guard';

@Controller('roles')
export class RolesController {
  constructor(
    @Inject(ROLES_SERVICES) private readonly rolesClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  createProduct(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesClient.send({ cmd: 'create_role' }, createRoleDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  findAll() {
    return this.rolesClient.send({ cmd: 'find_all_role' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
