import { Inject, Injectable } from '@nestjs/common';
import { CountDocumentsOptions, Db, Filter, FindOptions, UpdateFilter, UpdateOptions, DeleteOptions, DeleteResult } from 'mongodb';

@Injectable()
export class MongoDBService {
    private readonly _database: Db;
    constructor(
        @Inject('MONGODB_CONNECTION') private readonly database: Db
    ) {
        this._database = database;
    }

    /**
     * 
     * @param collectionName 
     * @returns 
     */
    async getOneAsync(collectionName: string): Promise<any> {
        const document = await this._database.collection(collectionName).findOne();
        return document;
    }

    /**
     * 
     * @param collectionName 
     * @param filter 
     * @param options 
     * @returns 
     */
    async getAllAsync<T>(collectionName: string, filter: Filter<T>, options?: FindOptions): Promise<T[]> {
        const document = await this._database.collection(collectionName).find<T>(filter, options).toArray();
        return document;
    }

    /**
     * 
     * @param collectionName 
     * @param model 
     * @returns 
     */
    async insertOneAsync<T>(collectionName: string, model: T): Promise<boolean> {
        const res = await this._database.collection(collectionName).insertOne(model);
        return res.acknowledged;
    }

    /**
     * 
     * @param collectionName 
     * @param models 
     * @returns 
     */
    async insertManyAsync<T>(collectionName: string, models: T[]): Promise<number> {
        const res = await this._database.collection(collectionName).insertMany(models);
        return res.insertedCount;
    }

    /**
     * 
     * @param collectionName 
     * @param filter 
     * @param options 
     * @returns 
     */
    async countAsync<T>(collectionName: string, filter: Filter<T>, options?: CountDocumentsOptions): Promise<number> {
        const count = await this._database.collection(collectionName).countDocuments(filter, options);
        return count;
    }

    /**
     * 
     * @param collectionName 
     * @param filter 
     * @param update 
     * @param options 
     */
    async updateOneAsync<T>(collectionName: string, filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options: UpdateOptions) {
        await this._database.collection(collectionName).updateOne(filter, update, options);
    }

    /**
    * 
    * @param collectionName 
    * @param filter 
    * @param update 
    * @param options 
    */
    async updateManyAsync<T>(collectionName: string, filter: Filter<T>, update: UpdateFilter<T> | Partial<T>, options: UpdateOptions) {
        await this._database.collection(collectionName).updateMany(filter, update, options);
    }

    /**
    * 
    * @param collectionName 
    * @param filter 
    * @param update 
    * @param options 
    */
    async deleteOneAsync<T>(collectionName: string, filter: Filter<T>, options: DeleteOptions): Promise<DeleteResult> {
        const deleteResult = await this._database.collection(collectionName).deleteOne(filter, options);
        return deleteResult
    }

    /**
    * 
    * @param collectionName 
    * @param filter 
    * @param delete 
    * @param options 
    */
    async deleteManyAsync<T>(collectionName: string, filter: Filter<T>, options: DeleteOptions): Promise<DeleteResult> {
        const deleteResult = await this._database.collection(collectionName).deleteMany(filter, options);
        return deleteResult
    }
}
