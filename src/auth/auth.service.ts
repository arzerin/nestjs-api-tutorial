import { Injectable } from "@nestjs/common";

import type { Request } from 'express';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {}

    test() {

    }
    login() {

    }

    signup(req: Request) {
        //return {'msg': 'I just signed up'}
        //console.log(req.body);
        return { msg: 'I Just signed up', body: req.body };
    }

    signin() {
        return {'msg': 'I signed in'}
    }
}