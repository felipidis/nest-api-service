import { Injectable } from '@nestjs/common';
import { Attendance, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async attendance(
    attendanceWhereUniqueInput: Prisma.AttendanceWhereUniqueInput,
  ): Promise<Attendance | null> {
    return this.prisma.attendance.findUnique({
      where: attendanceWhereUniqueInput,
      include: {
        jobs: true,
      },
    });
  }

  async attendances(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AttendanceWhereUniqueInput;
    where?: Prisma.AttendanceWhereInput;
    orderBy?: Prisma.AttendanceOrderByWithRelationInput;
  }): Promise<Attendance[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.attendance.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        jobs: true,
      },
    });
  }

  async createAttendance(
    data: Prisma.AttendanceCreateInput,
  ): Promise<Attendance> {
    return this.prisma.attendance.create({
      data,
    });
  }

  async updateAttendance(params: {
    where: Prisma.AttendanceWhereUniqueInput;
    data: Prisma.AttendanceUpdateInput;
  }): Promise<Attendance> {
    const { where, data } = params;
    return this.prisma.attendance.update({
      data,
      where,
    });
  }

  async deleteAttendance(
    where: Prisma.AttendanceWhereUniqueInput,
  ): Promise<Attendance> {
    return this.prisma.attendance.delete({
      where,
    });
  }
}
