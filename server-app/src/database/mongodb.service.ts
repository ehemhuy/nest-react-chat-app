import { Inject, Injectable } from '@nestjs/common';
import { CountDocumentsOptions, Db, Filter, FindOptions } from 'mongodb';


@Injectable()
export class MongoDBService {
    private readonly _database: Db;
    constructor(
        @Inject('MONGODB_CONNECTION') private readonly database: Db
    ) {
        this._database = database;
    }

    async insertOneAsync<T>(collectionName: string, model: T): Promise<boolean> {
        const res = await this._database.collection(collectionName).insertOne(model);
        return res.acknowledged;
    }

    async insertManyAsync<T>(collectionName: string, models: T[]): Promise<number> {
        const res = await this._database.collection(collectionName).insertMany(models);
        return res.insertedCount;
    }

    async getOneAsync(collectionName: string): Promise<any> {
        const document = await this._database.collection(collectionName).findOne();
        return document;
    }

    async getAllAsync<T>(collectionName: string, filter: Filter<T>, options?: FindOptions): Promise<T[]> {
        const document = await this._database.collection(collectionName).find<T>(filter, options).toArray();
        return document;
    }

    async countAsync<T>(collectionName: string, filter: Filter<T>, options?: CountDocumentsOptions): Promise<number> {
        const count = await this._database.collection(collectionName).countDocuments(filter, options);
        return count;
    }
}
