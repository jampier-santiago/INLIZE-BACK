// Packages
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// DTO's
import { CreateTeamDto } from './dto/create-team.dto';

// Entities
import { Team } from './entities/team.entity';

// Utils
import { handleDBExceptions } from 'utils/handleDB_Exception';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
  ) {}

  /**
   * Creates a new team.
   * @param createTeamDto - The data for creating the team.
   * @returns The created team.
   */
  async create(createTeamDto: CreateTeamDto) {
    const { description, name } = createTeamDto;

    try {
      const team = this.teamRepository.create({
        description,
        name,
      });

      await this.teamRepository.save(team);

      return { data: { id: team.id, name, description } };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Retrieves all teams from the team repository.
   * @returns {Promise<{ data: Team[] }>} A promise that resolves to an object containing the data of all teams.
   */
  async findAll() {
    try {
      const teams = await this.teamRepository.find();

      if (teams.length === 0) {
        return { data: [] };
      }

      const data = teams.map(({ id, name, description }) => ({
        id,
        name,
        description,
      }));

      return { data };
    } catch (error) {
      handleDBExceptions(error);
    }
  }
}
