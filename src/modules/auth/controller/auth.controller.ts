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
import { AuthDto, EmployeeAuthDto } from '../dto/auth.dto';
import { Request } from 'express';
import { AccessTokenGuard } from '../../../common/guards/accessToken.guard';
import { RefreshTokenGuard } from '../../../common/guards/refreshToken.guard';
import { EmployeeAccessTokenGuard } from '../../../common/guards/accessTokenEmployee.guard';
import { EmployeeRefreshTokenGuard } from 'src/common/guards/refreshTokenEmployee.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() authDto: AuthDto) {
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

  @Post('employee/signin')
  employeeSignIn(@Body() authDto: EmployeeAuthDto) {
    return this.authService.employeeSignIn(authDto);
  }

  @UseGuards(EmployeeAccessTokenGuard)
  @Get('employee/logout')
  employeeLogout(@Req() req: Request) {
    this.authService.employeeLogout(req.user['id']);
  }

  @UseGuards(EmployeeRefreshTokenGuard)
  @Get('employee/refresh')
  employeeRefreshTokens(@Req() req: Request) {
    const employeeId = req.user['id'];
    const refreshToken = req.user['refreshToken'];
    return this.authService.employeeRefreshTokens(employeeId, refreshToken);
  }
}
