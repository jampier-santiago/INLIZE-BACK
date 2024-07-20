// Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// DTO's
import { CreateRoleDto } from './dto/create-role.dto';

// Entities
import { Role } from './entities/role.entity';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * Creates a new role.
   *
   * @param createRoleDto - The data for creating the role.
   * @returns A Promise that resolves to an object containing the ID and name of the created role.
   */
  async create(createRoleDto: CreateRoleDto) {
    const { name } = createRoleDto;

    try {
      const { id, name: roleName } = await this.roleRepository.save({ name });

      return { data: { id, name: roleName } };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Retrieves all roles from the role repository.
   * @returns {Promise<{ data: { id: number, name: string }[] }>} A promise that resolves to an object containing the data array of roles.
   */
  async findAll() {
    try {
      const roles = await this.roleRepository.find();

      if (roles.length === 0) return { data: [] };

      const dataForSend = roles.map(({ id, name }) => ({ id, name }));

      return { data: [...dataForSend] };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
