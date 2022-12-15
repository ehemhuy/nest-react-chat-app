import { generateJwtToken } from './../../utils/jwt.util';
import { RegisterDTO } from './../../entities/user/dto/registerDto';
import { Injectable } from '@nestjs/common';
import { USER_COLLECTION } from './../../constants/collectionName';
import { User } from './../../entities/user/user.entity';
import { MongoDBService } from '../mongodb/mongodb.service';

interface RegisterResponse {
    token: string,
    isSuccess: boolean
}

@Injectable()
export class UserService {
    constructor(
        private readonly _mongoDBService: MongoDBService
    ) {
    }

    /**
    * 
    */
    async getUsers(): Promise<User[]> {
        return await this._mongoDBService.getAllAsync(USER_COLLECTION, {})
    }

    /**
     * 
     */
    async register(registerDto: RegisterDTO): Promise<RegisterResponse> {
        const user = new User()
        user.Username = registerDto.username
        user.Password = registerDto.password
        user.Email = registerDto.email
        const response: RegisterResponse = {
            isSuccess: false,
            token: ''
        }
        const isExistUser = await this._mongoDBService.countAsync(USER_COLLECTION, { Email: registerDto.email })
        response.isSuccess = isExistUser === 0
        if (!response.isSuccess) return response

        const isInserted = await this._mongoDBService.insertOneAsync(USER_COLLECTION, user)
        if (!isInserted) return response;

        const token = generateJwtToken(user.UserID);
        response.token = token
        response.isSuccess = true
        return response
    }
}
