import { User } from './../entities/user/user.entity';
import { RegisterDTO } from './../entities/user/dto/registerDto';
import { LoginDTO } from './../entities/user/dto/loginDto';
import { MongoDBService } from './../database/mongodb.service';
import { USER_COLLECTION } from './../constants/collectionName';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private readonly _mongoDBService: MongoDBService
    constructor(
        mongoDBService: MongoDBService
    ) {
        this._mongoDBService = mongoDBService
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
    async login(loginDto: LoginDTO): Promise<void> {
    }

    /**
     * 
     */
    async register(registerDto: RegisterDTO): Promise<boolean> {
        const user = new User()
        user.Username = registerDto.username
        user.Password = registerDto.password
        user.Email = registerDto.email
        const isExistUser = await this._mongoDBService.countAsync(USER_COLLECTION, { Email: registerDto.email })
        if (isExistUser) return false
        return await this._mongoDBService.insertOneAsync(USER_COLLECTION, user)
    }
}
