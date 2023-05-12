import { Injectable } from '@nestjs/common';
import { Professional, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ProfessionalService {
  constructor(private prisma: PrismaService) {}

  async professional(
    professionalWhereUniqueInput: Prisma.ProfessionalWhereUniqueInput,
  ): Promise<Professional | null> {
    return this.prisma.professional.findUnique({
      where: professionalWhereUniqueInput,
      include: {
        Services: {
          include: {
            jobs: true,
          },
        },
      },
    });
  }

  async professionals(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProfessionalWhereUniqueInput;
    where?: Prisma.ProfessionalWhereInput;
    orderBy?: Prisma.ProfessionalOrderByWithRelationInput;
  }): Promise<Professional[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.professional.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProfessional(
    data: Prisma.ProfessionalCreateInput,
  ): Promise<Professional> {
    const hash = await bcrypt.hash(data.password, 12);
    data.password = hash;
    return this.prisma.professional.create({
      data,
    });
  }

  async updateProfessional(params: {
    where: Prisma.ProfessionalWhereUniqueInput;
    data: Prisma.ProfessionalUpdateInput;
  }): Promise<Professional> {
    const { where, data } = params;
    return this.prisma.professional.update({
      data,
      where,
    });
  }

  async deleteProfessional(
    where: Prisma.ProfessionalWhereUniqueInput,
  ): Promise<Professional> {
    return this.prisma.professional.delete({
      where,
    });
  }
}
