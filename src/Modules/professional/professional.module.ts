import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';

@Module({
  imports: [],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, PrismaService],
})
export class ProfessionalModule {}
