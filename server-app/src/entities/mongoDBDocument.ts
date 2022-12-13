import { Document } from 'mongodb'

export class MongoDBDocument extends Document {
    /**
    * 
    */
    CreatedDate: Date = new Date()

    /**
     * 
     */
    ModifiedDate: Date = new Date()
}