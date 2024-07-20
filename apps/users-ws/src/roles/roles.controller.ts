// Packages
import { Controller } from '@nestjs/common';

// Services
import { RolesService } from './roles.service';

// DTO's
import { CreateRoleDto } from './dto/create-role.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({ cmd: 'create_role' })
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern({ cmd: 'find_all_role' })
  findAll() {
    return this.rolesService.findAll();
  }
}
