import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SeedingModule } from './seeder/seeder.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    SeedingModule,
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_CLOUD),
  ],
})
export class AppModule { }
