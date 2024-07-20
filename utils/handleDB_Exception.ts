import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const handleDBExceptions = (error: any) => {
  // console.log(error);
  // Error para datos duplicados
  if (error.code === '23505') throw new BadRequestException(error.detail);

  if (error.status === 400) throw new BadRequestException(error.message);

  if (error.status === 404) throw new NotFoundException(error.message);

  if (error.status === 401) throw new UnauthorizedException(error.message);

  throw new InternalServerErrorException('Unexpected error, check server logs');
};
