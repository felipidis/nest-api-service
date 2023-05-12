import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { env } from 'process';
import { ClientService } from '../client/client.service';
import { ProfessionalService } from '../professional/professional.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.TOKEN_SECRET,
    }),
  ],
  providers: [AuthService, ClientService, ProfessionalService, PrismaService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
