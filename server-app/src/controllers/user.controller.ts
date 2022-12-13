import { User } from './../entities/user/user.entity';
import { UserService } from './../services/user.service';
import { BadRequestException, Body, Controller, Post, Req } from '@nestjs/common';
import { LoginDTO } from 'src/entities/user/dto/loginDto';
import { RegisterDTO } from 'src/entities/user/dto/registerDto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService,
    ) { }

    @Post('/filter')
    async getUsers(): Promise<any> {
        try {
            const res = await this.userService.getUsers();
            return res;
        } catch (error) {
            return new BadRequestException()
        }
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDTO): Promise<any> {
        try {
            const data = await this.userService.login(loginDto);
            return data;
        } catch (error) {
            return new BadRequestException()
        }
    }

    @Post('/register')
    async register(@Body() registerDto: RegisterDTO): Promise<any> {
        try {
            if (!registerDto.email || !registerDto.username || !registerDto.password) return new BadRequestException("Error input")
            const res = await this.userService.register(registerDto);
            if (!res) return new BadRequestException("User exist")
            return res;
        } catch (error) {
            return new BadRequestException()
        }
    }
}
