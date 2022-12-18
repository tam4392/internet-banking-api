import { CustomerService } from '../../customer/service/customer.service';
import { AuthDto, EmployeeAuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EmployeeService } from '../../employee/service/employee.service';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private employeeService: EmployeeService,
  ) {}

  async getTokens(id: number, username: string): Promise<any> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: id,
          username,
        },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          id: id,
          username,
        },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.customerService.updateRefreshToken(userId, hashRefreshToken);
  }

  async signIn(authDto: AuthDto): Promise<any> {
    const { username, password } = authDto;
    const customer = await this.customerService.findByUserName(username);
    const isCompare: boolean = await bcrypt.compare(
      password,
      customer.password,
    );
    if (customer && isCompare) {
      const tokens = await this.getTokens(customer.id, customer.userName);
      await this.updateRefreshToken(customer.id, tokens.refreshToken);
      return tokens;
    } else {
      throw new UnauthorizedException('auth_credential_is_wrong');
    }
  }

  async logout(customerId: number) {
    return this.customerService.updateRefreshToken(customerId, '');
  }

  async refreshTokens(customerId: number, refreshToken: string) {
    const customer = await this.customerService.findOne(customerId);
    if (!customer || !customer.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches: boolean = await bcrypt.compare(
      refreshToken,
      customer.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(customer.id, customer.userName);
    await this.updateRefreshToken(customer.id, tokens.refreshToken);
    return tokens;
  }

  async employeeUpdateRefreshToken(
    employeeId: number,
    refreshToken: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.employeeService.updateRefreshToken(employeeId, hashRefreshToken);
  }

  async employeeSignIn(authDto: EmployeeAuthDto): Promise<any> {
    const { email, password } = authDto;
    const employee = await this.employeeService.findByEmail(email);
    const isCompare: boolean = await bcrypt.compare(
      password,
      employee.password,
    );
    if (employee && isCompare) {
      const tokens = await this.getTokens(employee.id, employee.email);
      await this.updateRefreshToken(employee.id, tokens.refreshToken);
      return tokens;
    } else {
      throw new UnauthorizedException('auth_credential_is_wrong');
    }
  }

  async employeeLogout(employeeId: number) {
    return this.employeeService.updateRefreshToken(employeeId, '');
  }

  async employeeRefreshTokens(employeeId: number, refreshToken: string) {
    const employee = await this.employeeService.findOne(employeeId);
    if (!employee || !employee.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches: boolean = await bcrypt.compare(
      refreshToken,
      employee.refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.getTokens(employee.id, employee.email);
    await this.updateRefreshToken(employee.id, tokens.refreshToken);
    return tokens;
  }
}
