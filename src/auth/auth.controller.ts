import { Body, Controller, Post, Req} from "@nestjs/common";
import type { Request } from 'express';
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth') 
export class AuthController {
    
    constructor(private authService: AuthService) {
        this.authService.test()
    }

    @Post('signup')
    // signup(@Req() req: Request) {
    //     console.log('Request:: ', req.body);
    //     //return this.authService.signup(req.body);
    //     return this.authService.signup();
        
    // }
    //signup(@Body() dto: any) {
    signup(@Body() dto: AuthDto) {
        console.log({
            dto,
        });
        //return dto;
        //return this.authService.signup(req.body);

         

        return this.authService.signup(dto);
        
    }

    // signup(
    //     @Body('email') email: string,
    //     @Body('password') password: string,
    // ) {
    //     console.log({
    //         email,
    //         typeOfEmail: typeof email,
    //         password,
    //         typeOfPassword: typeof password
    //     });
  
    //     return this.authService.signup();
    //   }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        console.log({
            'Signin DTO' : dto,
        });

        
        return this.authService.signin(dto);
    }


}
