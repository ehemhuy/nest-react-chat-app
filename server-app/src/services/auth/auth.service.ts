import { LoginDTO } from './../../entities/user/dto/loginDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    /**
     * 
     */
    async login(loginDto: LoginDTO): Promise<void> {
    }
}
