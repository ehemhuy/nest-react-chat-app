import { BaseModel } from "../baseModel";
import { v4 as uuidv4 } from 'uuid';

export class User extends BaseModel {
    UserID: string = uuidv4()
    /**
     * 
     */
    Username: string

    /**
     * 
     */
    Password: string

    /**
     * 
     */
    Email: string
}