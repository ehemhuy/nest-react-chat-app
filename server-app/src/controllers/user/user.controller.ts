import { RegisterDTO } from './../../entities/user/dto/registerDto';
import { UserService } from './../../services/user/user.service';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';

@Controller('user')
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
