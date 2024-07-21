// Packages
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { User } from 'apps/users-ws/src/users/entities/user.entity';

// Interfaces
import { JwtPayload } from '../interfaces/jwt-payload.interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * Validates the JWT payload and returns the corresponding user.
   * @param payload - The JWT payload to validate.
   * @returns The user associated with the JWT payload.
   * @throws UnauthorizedException if the token is not valid.
   */
  async validate(payload: JwtPayload) {
    const { id } = payload;

    try {
      const user = this.userRepository.findOne({
        where: { id },
        relations: ['role'],
      });

      if (!user) throw new UnauthorizedException();

      return user;
    } catch (error) {
      return error;
    }
  }
}
