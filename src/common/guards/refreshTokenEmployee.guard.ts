import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmployeeRefreshTokenGuard extends AuthGuard(
  'jwt-employee-refresh',
) {}
