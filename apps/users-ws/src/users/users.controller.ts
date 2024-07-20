// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { UsersService } from './users.service';

// DTO's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'create_user' })
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'find_all_users' })
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'find_one_user' })
  findOne(@Payload('id') id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern({ cmd: 'remove_user' })
  remove(@Payload('id') id: number) {
    return this.usersService.remove(id);
  }
}
