import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';
import { ProfessionalService } from '../professional/professional.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private clientService: ClientService,
    private professionalService: ProfessionalService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string, isProfessional: boolean) {
    if (isProfessional) {
      const professional = await this.professionalService.professional({
        email,
      });

      const passwordMatches = await bcrypt.compare(pass, professional.password);

      if (!passwordMatches) {
        throw new UnauthorizedException();
      }
      const payload = { email: professional.email, sub: professional.id };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    const client = await this.clientService.client({ email });
    const passwordMatches = await bcrypt.compare(pass, client.password);

    if (!passwordMatches) {
      throw new UnauthorizedException();
    }

    const payload = { email: client.email, sub: client.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
