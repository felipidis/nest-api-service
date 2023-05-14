import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

@Module({
  imports: [],
  controllers: [ClientController],
  providers: [ClientService, PrismaService],
})
export class ClientModule {}
