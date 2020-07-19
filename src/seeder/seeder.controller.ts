import { Controller, Get, HttpStatus, Req } from "@nestjs/common";
import { SeedToDatabaseService } from "./seed-to-db.service";
import { MainResponse } from "../common/MainResponse";
import { User } from "../user/db/user.interface";
import { Request } from 'express'

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedToDatabaseService) { }
    @Get()
    async seed(@Req() req: Request): Promise<MainResponse<User[]>> {
        const users = await this.seedService.seedData();
        return new MainResponse("Created",
            HttpStatus.CREATED,
            req.path,
            users);
    }
}
