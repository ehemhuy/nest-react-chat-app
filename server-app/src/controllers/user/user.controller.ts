import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterDTO } from './../../entities/user/dto/registerDto';
import { UserService } from './../../services/user/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService,
    ) { }

    @Post('/filter')
    async getUsers(@Res() response: Response): Promise<any> {
        try {
            const users = await this.userService.getUsers();
            return response.send(users).end;
        } catch (error) {
            return response.status(200).end();
        }
    }

    @Post('/register')
    async register(@Body() registerDto: RegisterDTO, @Res() response: Response): Promise<any> {
        try {
            if (!registerDto.email || !registerDto.username || !registerDto.password) return response.status(400).end()

            const serviceResponse = await this.userService.register(registerDto);
            if (!serviceResponse.isSuccess) return response.status(400).end()

            response.cookie('Authorization', serviceResponse.token, {
                sameSite: 'strict',
                httpOnly: true,
            });
            return response.status(200).end();
        } catch (error) {
            return response.status(400).end();
        }
    }
}
