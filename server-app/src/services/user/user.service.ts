import { RegisterDTO } from './../../entities/user/dto/registerDto';
import { Injectable } from '@nestjs/common';
import { USER_COLLECTION } from './../../constants/collectionName';
import { User } from './../../entities/user/user.entity';
import { MongoDBService } from '../mongodb/mongodb.service';

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
