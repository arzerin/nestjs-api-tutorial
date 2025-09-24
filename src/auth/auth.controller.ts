import { Controller, Post, Req} from "@nestjs/common";
import type { Request } from 'express';
import { AuthService } from "./auth.service";

@Controller('auth') 
export class AuthController {
    
    constructor(private authService: AuthService) {
        this.authService.test()
    }

    @Post('signup')
    signup(@Req() req: Request) {
        console.log('Request:: ', req.body);
        return this.authService.signup(req.body);
        
    }

    @Post('signin')
    signin() {
        return this.authService.signin();
    }


}
