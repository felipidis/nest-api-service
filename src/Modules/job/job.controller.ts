import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Job as JobModel } from '@prisma/client';

@Controller()
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('job')
  async getJobs(): Promise<JobModel[]> {
    return this.jobService.jobs({});
  }

  @Get('job/:id')
  async getJobById(@Param('id') id: string): Promise<JobModel> {
    return this.jobService.job({ id });
  }

  @Post('job')
  async createJob(
    @Body()
    jobData: {
      description: string;
      price: number;
      duration: number;
      commission: number;
    },
  ): Promise<JobModel> {
    const { description, price, duration, commission } = jobData;
    return this.jobService.createJob({
      description,
      price,
      duration,
      commission,
    });
  }

  @Put('job/:id')
  async updateJob(
    @Param('id') id: string,
    @Body()
    jobData: {
      description?: string;
      price?: number;
      duration?: number;
      commission?: number;
    },
  ): Promise<JobModel> {
    return this.jobService.updateJob({
      where: { id },
      data: jobData,
    });
  }

  @Delete('job/:id')
  async deletePost(@Param('id') id: string): Promise<JobModel> {
    return this.jobService.deleteJob({ id });
  }
}
