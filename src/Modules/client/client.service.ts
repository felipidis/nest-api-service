import { Injectable } from '@nestjs/common';
import { Client, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    clientWhereUniqueInput: Prisma.ClientWhereUniqueInput,
  ): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: clientWhereUniqueInput,
      include: {
        Attendance: {
          include: {
            jobs: true,
          },
        },
      },
    });
  }

  async clients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ClientWhereUniqueInput;
    where?: Prisma.ClientWhereInput;
    orderBy?: Prisma.ClientOrderByWithRelationInput;
  }): Promise<Client[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createClient(data: Prisma.ClientCreateInput): Promise<Client> {
    const hash = await bcrypt.hash(data.password, 12);
    data.password = hash;
    return this.prisma.client.create({
      data,
    });
  }

  async updateClient(params: {
    where: Prisma.ClientWhereUniqueInput;
    data: Prisma.ClientUpdateInput;
  }): Promise<Client> {
    const { where, data } = params;
    return this.prisma.client.update({
      data,
      where,
    });
  }

  async deleteClient(where: Prisma.ClientWhereUniqueInput): Promise<Client> {
    return this.prisma.client.delete({
      where,
    });
  }
}
