import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { CustomerModule } from '../customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from '../employee/employee.module';
import { EmployeeAccessTokenStrategy } from './strategies/accessTokenEmployee.strategy';
import { EmployeeRefreshTokenStrategy } from './strategies/refreshTokenEmployee.strategy';

@Module({
  imports: [
    JwtModule.register({}),
    CustomerModule,
    ConfigModule,
    EmployeeModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    EmployeeAccessTokenStrategy,
    EmployeeRefreshTokenStrategy,
  ],
})
export class AuthModule {}
