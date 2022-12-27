import { LoginDTO } from './../../entities/user/dto/loginDto';
import { AuthService } from './../../services/auth/auth.service';
import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
    ) { }

    @Post('/login')
    async login(@Body() loginDto: LoginDTO, @Res() response: Response): Promise<any> {
        try {
            const serviceResponse = await this.authService.login(loginDto);
            if (!serviceResponse.isSuccess) return response.status(400).end()
            response.cookie('Authorization', serviceResponse.data?.toString() ?? "", {
                sameSite: 'strict',
                httpOnly: true,
            });
            return response.status(200).end()
        } catch (error) {
            return new BadRequestException()
        }
    }
}
