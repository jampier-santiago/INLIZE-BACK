// Packages
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

// Services
import { TeamsService } from './teams.service';

// DTO's
import { CreateTeamDto } from './dto/create-team.dto';

@Controller()
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @MessagePattern({ cmd: 'create_team' })
  create(@Payload() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @MessagePattern({ cmd: 'find_all_teams' })
  findAll() {
    return this.teamsService.findAll();
  }
}
