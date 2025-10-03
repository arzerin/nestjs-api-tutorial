import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, JwtModule.register({}), PrismaModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}

