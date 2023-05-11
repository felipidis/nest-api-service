import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client as ClientModel } from '@prisma/client';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('client')
  async getClients(): Promise<ClientModel[]> {
    return this.clientService.clients({});
  }

  @Get('client/:id')
  async getClientById(@Param('id') id: string): Promise<ClientModel> {
    return this.clientService.client({ id });
  }

  @Post('client')
  async createClient(
    @Body()
    clientData: {
      name: string;
      email: string;
      password: string;
    },
  ): Promise<ClientModel> {
    const { name, email, password } = clientData;
    return this.clientService.createClient({
      name,
      email,
      password,
    });
  }

  @Put('client/:id')
  async updateClient(
    @Param('id') id: string,
    @Body()
    clientData: {
      name?: string;
      email?: string;
      password?: string;
    },
  ): Promise<ClientModel> {
    return this.clientService.updateClient({
      where: { id },
      data: clientData,
    });
  }

  @Delete('client/:id')
  async deletePost(@Param('id') id: string): Promise<ClientModel> {
    return this.clientService.deleteClient({ id });
  }
}
