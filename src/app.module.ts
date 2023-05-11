import { Module } from '@nestjs/common';
import { AttendanceModule } from './Modules/attendance/attendance.module';
import { ClientModule } from './Modules/client/client.module';
import { JobModule } from './Modules/job/job.module';
import { ProfessionalModule } from './Modules/professional/professional.module';

@Module({
  imports: [ClientModule, ProfessionalModule, JobModule, AttendanceModule],
})
export class AppModule {}
