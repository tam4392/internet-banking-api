import { CustomerService } from 'src/modules/customer/service/customer.service';
import { AuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
}
