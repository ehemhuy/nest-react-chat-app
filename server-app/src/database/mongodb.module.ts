import { Module } from "@nestjs/common";
import { MongoClient, Db, } from 'mongodb';

@Module({
    providers: [{
        provide: 'MONGODB_CONNECTION',
        useFactory: async (): Promise<Db> => {
            try {
                const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING,);
                return client.db('huy');
            } catch (e) {
                throw e;
            }
        }
    }
    ],
    exports: [
        'MONGODB_CONNECTION'
    ]
})

export class MongoDbModule { }
