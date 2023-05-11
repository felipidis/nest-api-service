import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional as ProfessionalModel } from '@prisma/client';

@Controller()
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Get('professional')
  async getProfessionals(): Promise<ProfessionalModel[]> {
    return this.professionalService.professionals({});
  }

  @Get('professional/:id')
  async getProfessionalById(
    @Param('id') id: string,
  ): Promise<ProfessionalModel> {
    return this.professionalService.professional({ id });
  }

  @Post('professional')
  async createProfessional(
    @Body()
    professionalData: {
      name: string;
      email: string;
      password: string;
    },
  ): Promise<ProfessionalModel> {
    const { name, email, password } = professionalData;
    return this.professionalService.createProfessional({
      name,
      email,
      password,
    });
  }

  @Put('professional/:id')
  async updateProfessional(
    @Param('id') id: string,
    @Body()
    professionalData: {
      name?: string;
      email?: string;
      password?: string;
    },
  ): Promise<ProfessionalModel> {
    return this.professionalService.updateProfessional({
      where: { id },
      data: professionalData,
    });
  }

  @Delete('professional/:id')
  async deletePost(@Param('id') id: string): Promise<ProfessionalModel> {
    return this.professionalService.deleteProfessional({ id });
  }
}
