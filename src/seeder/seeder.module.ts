import { Module } from '@nestjs/common';
import { SeedController } from './seeder.controller';
import { SeedToDatabaseService } from './seed-to-db.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        UserModule,
        MongooseModule.forRoot(process.env.DATABASE_CONNECTION),
    ],
    controllers: [SeedController],
    providers: [SeedToDatabaseService],
})
export class SeedingModule { }
