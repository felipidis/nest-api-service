import { Injectable } from '@nestjs/common';
import { Job, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobService {
  constructor(private prisma: PrismaService) {}

  async job(
    jobWhereUniqueInput: Prisma.JobWhereUniqueInput,
  ): Promise<Job | null> {
    return this.prisma.job.findUnique({
      where: jobWhereUniqueInput,
    });
  }

  async jobs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobWhereUniqueInput;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput;
  }): Promise<Job[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.job.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createJob(data: Prisma.JobCreateInput): Promise<Job> {
    return this.prisma.job.create({
      data,
    });
  }

  async updateJob(params: {
    where: Prisma.JobWhereUniqueInput;
    data: Prisma.JobUpdateInput;
  }): Promise<Job> {
    const { where, data } = params;
    return this.prisma.job.update({
      data,
      where,
    });
  }

  async deleteJob(where: Prisma.JobWhereUniqueInput): Promise<Job> {
    return this.prisma.job.delete({
      where,
    });
  }
}
