import { LoginDTO } from './../../entities/user/dto/loginDto';
import { AuthService } from './../../services/auth/auth.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    ) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDTO): Promise<any> {
        try {
            const data = await this.authService.login(loginDto);
            return data;
        } catch (error) {
            return new BadRequestException()
        }
    }
}
