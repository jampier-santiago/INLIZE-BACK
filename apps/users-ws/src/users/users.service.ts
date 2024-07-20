// Packages
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';

// DTO's
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Entities
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Team } from '../teams/entities/team.entity';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto - The data for creating a new user.
   * @returns The created user.
   * @throws NotFoundException if the specified role or team is not found.
   */
  async create(createUserDto: CreateUserDto) {
    const { email, name, password, role, team } = createUserDto;

    try {
      const dataRole = await this._validatedRole(role);

      const dataTeam = await this._validatedTeam(team);

      const user = this.userRepository.create({
        email,
        name,
        password: hashSync(password, 10),
        role: dataRole,
        team: dataTeam,
      });

      await this.userRepository.save(user);

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.deletedAt;

      delete user.role.createdAt;
      delete user.role.updatedAt;
      delete user.role.deletedAt;

      delete user.team.createdAt;
      delete user.team.updatedAt;
      delete user.team.deletedAt;
      delete user.team.description;

      return user;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Validates and retrieves a role based on the provided role ID.
   * @param role - The ID of the role to validate.
   * @returns A Promise that resolves to the validated role.
   * @throws NotFoundException if the role is not found.
   */
  private async _validatedRole(role: number): Promise<Role> {
    const dataRole = await this.roleRepository.findOneBy({
      id: role,
    });

    if (!dataRole) {
      throw new NotFoundException('Role not found');
    }

    return dataRole;
  }

  /**
   * Validates the team with the given ID.
   * @param team - The ID of the team to validate.
   * @returns A Promise that resolves to the validated team.
   * @throws NotFoundException if the team is not found.
   */
  private async _validatedTeam(team: number): Promise<Team> {
    const dataTeam = await this.teamRepository.findOneBy({
      id: team,
    });

    if (!dataTeam) {
      throw new NotFoundException('Team not found');
    }

    return dataTeam;
  }

  /**
   * Retrieves all users from the database.
   * @returns {Promise<{ data: any[] }>} An object containing the data array of users.
   */
  async findAll() {
    try {
      const users = await this.userRepository.find({
        relations: ['role', 'team'],
      });

      if (users.length === 0) return { data: [] };

      const dataForSend = users.map(({ id, email, name, role, team }) => {
        delete role.createdAt;
        delete role.updatedAt;
        delete role.deletedAt;

        delete team.createdAt;
        delete team.updatedAt;
        delete team.deletedAt;
        delete team.description;

        return {
          id,
          email,
          name,
          role,
          team,
        };
      });

      return { data: [...dataForSend] };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Finds a user by their ID.
   *
   * @param id - The ID of the user to find.
   * @returns A Promise that resolves to the found user.
   * @throws NotFoundException if the user is not found.
   */
  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['role', 'team'],
      });

      if (!user) throw new NotFoundException('User not found');

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.deletedAt;

      delete user.role.createdAt;
      delete user.role.updatedAt;
      delete user.role.deletedAt;

      delete user.team.createdAt;
      delete user.team.updatedAt;
      delete user.team.deletedAt;
      delete user.team.description;

      return user;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Updates a user with the provided ID using the information from the updateUserDto.
   * @param id - The ID of the user to update.
   * @param updateUserDto - The DTO containing the updated user information.
   * @returns The updated user object.
   * @throws NotFoundException if the user with the provided ID is not found.
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, name, password, role, team } = updateUserDto;

    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) throw new NotFoundException('User not found');

      const dataRole = await this._validatedRole(role);

      const dataTeam = await this._validatedTeam(team);

      user.email = email;
      user.name = name;
      user.password = hashSync(password, 10);
      user.role = dataRole;
      user.team = dataTeam;

      await this.userRepository.update(id, user);

      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      delete user.deletedAt;

      delete user.role.createdAt;
      delete user.role.updatedAt;
      delete user.role.deletedAt;

      delete user.team.createdAt;
      delete user.team.updatedAt;
      delete user.team.deletedAt;
      delete user.team.description;

      return user;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Removes a user by their ID.
   * @param id - The ID of the user to be removed.
   * @returns A promise that resolves to an object with a success message.
   * @throws NotFoundException if the user with the specified ID is not found.
   */
  async remove(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) throw new NotFoundException('User not found');

      await this.userRepository.softRemove(user);

      return { message: 'User deleted successfully' };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
