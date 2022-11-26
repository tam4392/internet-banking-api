import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/employee/employee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from './config/orm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(configOrm),
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`],
    }),
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
