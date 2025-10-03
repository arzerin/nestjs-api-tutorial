import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookmarkController } from './bookmark.controller';

@Module({
    imports: [PrismaModule],
    controllers: [BookmarkController],
})
export class BookmarkModule {}
