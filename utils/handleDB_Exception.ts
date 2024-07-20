//Packages
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const handleDBExceptions = (error: any) => {
  // Error para datos duplicados
  if (error.code === '23505')
    throw new RpcException({
      message: error.detail,
      statusCode: HttpStatus.BAD_REQUEST,
    });

  throw new RpcException({
    message: error.message,
    statusCode: error.status,
  });
};
