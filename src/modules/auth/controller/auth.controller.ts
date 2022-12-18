import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { Request } from 'express';
import { AccessTokenGuard } from '../../../common/guards/accessToken.guard';
import { RefreshTokenGuard } from '../../../common/guards/refreshToken.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  create(@Body() authDto: AuthDto) {
    return this.authService.signIn(authDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['id']);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
