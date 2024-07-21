import {
  Controller,
  Get,
  Post,
  Body,
  Inject,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

// DTO's
import { CreateTeamDto } from 'apps/users-ws/src/teams/dto/create-team.dto';

// Config
import { TEAMS_SERVICES } from '../config/services';

// Utils
import { RolesGuard } from 'utils/guards/roles/roles.guard';

@Controller('teams')
export class TeamsController {
  constructor(
    @Inject(TEAMS_SERVICES) private readonly teamsClient: ClientProxy,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsClient.send({ cmd: 'create_team' }, createTeamDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @SetMetadata('rols', ['super-admin'])
  findAll() {
    return this.teamsClient.send({ cmd: 'find_all_teams' }, {}).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }
}
