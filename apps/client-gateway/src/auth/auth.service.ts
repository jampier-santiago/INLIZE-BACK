// Packages
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

// DTO's
import { CreateAuthDto } from './dto/create-auth.dto';

// Utils
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { handleDBExceptions } from 'utils/handleDB_Exception';

// Entities
import { User } from 'apps/users-ws/src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Authenticates a user with the provided credentials.
   *
   * @param createAuthDto - The DTO containing the email and password for authentication.
   * @returns An object containing the authenticated user and a JWT token.
   * @throws UnauthorizedException if the credentials are not valid.
   */
  async login(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    try {
      const user = await this.userRepository.findOne({
        where: { email: email.toLowerCase().trim() },
        relations: ['role'],
      });

      if (!user) throw new UnauthorizedException('Credentials are not valid');

      if (!compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid');

      delete user.password;
      delete user.deletedAt;
      delete user.createdAt;

      delete user.role.createdAt;
      delete user.role.deletedAt;
      delete user.role.updatedAt;

      return {
        user: { ...user },
        token: this._getJWT({
          email: user.email,
          password: user.password,
          id: user.id,
        }),
      };
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  /**
   * Generates a JSON Web Token (JWT) using the provided payload.
   * @param payload - The payload to be included in the JWT.
   * @returns The generated JWT.
   */
  private _getJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
