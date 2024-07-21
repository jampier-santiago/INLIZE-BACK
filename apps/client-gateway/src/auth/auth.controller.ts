// Packages
import { Controller, Post, Body } from '@nestjs/common';

// Services
import { AuthService } from './auth.service';

// DTO's
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }
}
