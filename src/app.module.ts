import { Module } from '@nestjs/common';
import { AttendanceModule } from './Modules/attendance/attendance.module';
import { AuthModule } from './Modules/auth/auth.module';
import { ClientModule } from './Modules/client/client.module';
import { JobModule } from './Modules/job/job.module';
import { ProfessionalModule } from './Modules/professional/professional.module';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ClientModule,
    ProfessionalModule,
    JobModule,
    AttendanceModule,
    AuthModule,
    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
