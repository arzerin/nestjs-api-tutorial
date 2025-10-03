import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";

import type { Request } from 'express';
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";

import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

    test() {

    }
    login() {

    }

    signupv2(req: Request) {
        //return {'msg': 'I just signed up'}
        //console.log(req.body);
        return { msg: 'I Just signed up', body: req.body };
    }

    signupv3(req: Request) {
        //return {'msg': 'I just signed up'}
        //console.log(req.body);
        return { msg: 'I Just signed up', body: req.body };
    }

    async signup(dto: AuthDto) {
        
        const hash = await argon.hash(dto.password)
        try{
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                select: {
                    id: true,
                    email: true,
                    createdAt: true,
                }
            });
            //delete user.hash;

            return user;
        } catch (error) {
           console.error('Error creating user:', error);
           if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002')
            {
                 throw new ForbiddenException(
                    'Credentials Taken',
                 )
            }
           }
           throw new BadRequestException('User creation error');
           return { msg: 'User creation error' };
        }
        
        return { msg: 'I Just Signed Up', hashkey: hash};
    }

    async signin(dto: AuthDto) {

        const user =
            await this.prisma.user.findUnique({
                where: {
                 email: dto.email,
                },
                
            });
        // // if user does not exist throw exception
        if (!user)
        throw new ForbiddenException(
            'Credentials incorrect',
        );

        if (user) {
            console.log(user);
        }
            
        // throw new ForbiddenException(
        //     'user found',
        // );

        // compare password
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        // if password incorrect throw exception
        if (!pwMatches)
        throw new ForbiddenException(
            'Credentials incorrect',
        );
        delete (user as any).hash;
        // return 'here';
        return this.signToken(user.id, user.email);
        // return user;
        // return {
        //     id: user.id,
        //     createdAt: user.createdAt,
        //     updatedAt: user.updatedAt,
        // };
        // return dto;

        return {'msg': 'I Just signed in'}
    }

    //async signToken(userId: number, email: string): Promise<string>
    async signToken(userId: number, email: string): Promise<{access_token: string}>
    {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: secret,
        });

        return {access_token: token};
    }
}