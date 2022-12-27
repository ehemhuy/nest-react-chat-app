import { generateJwtToken } from './../../utils/jwt.util';
import { ServiceResponse } from './../../types/serviceResponse';
import { USER_COLLECTION } from './../../constants/collectionName';
import { User } from './../../entities/user/user.entity';
import { MongoDBService } from './../mongodb/mongodb.service';
import { LoginDTO } from './../../entities/user/dto/loginDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private readonly _mongoDBService: MongoDBService
    constructor(private mongoDBService: MongoDBService) {
        this._mongoDBService = mongoDBService
    }

    /**
     * 
     */
    async login(loginDto: LoginDTO): Promise<ServiceResponse> {
        const response: ServiceResponse = {
            isSuccess: true
        }
        const user = await this._mongoDBService.getOneAsync<User>(USER_COLLECTION, { Email: loginDto.email, Password: loginDto.password })
        if (!user) {
            response.isSuccess = false
            return response
        }
        const token = generateJwtToken(user.UserID);
        response.data = token
        return response
    }
}
