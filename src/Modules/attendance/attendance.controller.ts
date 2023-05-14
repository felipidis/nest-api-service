import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { Attendance as AttendanceModel } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('attendance')
  async getAttendances(): Promise<AttendanceModel[]> {
    return this.attendanceService.attendances({});
  }

  @Get('attendance/:id')
  async getAttendanceById(@Param('id') id: string): Promise<AttendanceModel> {
    return this.attendanceService.attendance({ id });
  }

  @UseGuards(AuthGuard)
  @Post('attendance')
  async createAttendance(
    @Body()
    attendanceData: {
      jobIds: string[];
    },
    @Req() req,
  ): Promise<AttendanceModel> {
    const { jobIds } = attendanceData;
    return this.attendanceService.createAttendance({
      client: { connect: { id: req.user.sub } },
      jobs: {
        connect: jobIds.map((job) => ({
          id: job,
        })),
      },
    });
  }

  @UseGuards(AuthGuard)
  @Put('attendance/:id')
  async updateAttendance(
    @Param('id') id: string,
    @Body()
    attendanceData: {
      jobs?: string[];
      professionalId?: string;
      isFinished?: boolean;
    },
  ): Promise<AttendanceModel> {
    return this.attendanceService.updateAttendance({
      where: { id },
      data: {
        ...attendanceData,
        jobs: {
          connect: attendanceData.jobs?.map((job) => ({
            id: job,
          })),
        },
      },
    });
  }

  @Delete('attendance/:id')
  async deletePost(@Param('id') id: string): Promise<AttendanceModel> {
    return this.attendanceService.deleteAttendance({ id });
  }
}
