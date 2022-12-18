import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmployeeAccessTokenGuard extends AuthGuard('jwt-employee') {}
