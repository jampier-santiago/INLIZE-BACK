import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

// DTO's
import { CreateTeamDto } from 'apps/users-ws/src/teams/dto/create-team.dto';

// Config
import { TEAMS_SERVICES } from '../config/services';

@Controller('teams')
export class TeamsController {
  constructor(
    @Inject(TEAMS_SERVICES) private readonly teamsClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsClient.send({ cmd: 'create_team' }, createTeamDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll() {
    return this.teamsClient.send({ cmd: 'find_all_teams' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
