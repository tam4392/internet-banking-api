import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const configOrm: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      synchronize: true,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      port: configService.get('DB_PORT'),
      host: configService.get('DB_HOST'),
      database: configService.get('DB_DATABASE'),
    };
  },
};
