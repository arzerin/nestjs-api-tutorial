import { Body, Controller, Post, Get, Req} from "@nestjs/common";
import type { Request } from 'express';
import { PrismaService } from "src/prisma/prisma.service";

@Controller('bookmark') 
export class BookmarkController {
    

    constructor(private prisma: PrismaService) {}

    @Get('list')
    async listBookmarks() {
      //return "Hello";  
      const bookmarks = await this.prisma.bookmark.findMany();

      return bookmarks;
    }
    

}
