import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

import { config } from 'process';


@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          //url: 'postgresql://postgres:postgres@localhost:5432/bookmarks?schema=public',
          url: config.get('DATABASE_URL'),
          //url: process.env.DATABASE_URL,
        },
      },
    });
    console.log(config.get('DATABASE_URL'));
  }

}