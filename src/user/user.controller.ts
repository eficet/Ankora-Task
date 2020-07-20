import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Query,
    HttpStatus,
    Req,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { User } from './db/user.interface';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { MainResponse } from '../common/MainResponse';
import { UserConstants } from './helper/user-constants';
import { Request } from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Get()
    async getUsersAndFilter(@Req() req: Request, @Query() searUserDto: SearchUserDto,
    ): Promise<MainResponse<User[]>> {
        const users = await this.userService.getUsersWithFilters(searUserDto);
        return new MainResponse(
            UserConstants.USERS_FOUND,
            HttpStatus.OK,
            req.path,
            users,
        );
    }


    @Get('/:id')
    async getUserById(@Req() req: Request, @Param("id") id: string): Promise<MainResponse<User>> {
        console.log(id)
        const user = await this.userService.getUserById(id);
        return new MainResponse(
            UserConstants.USER_FOUND,
            HttpStatus.OK,
            req.path,
            user);
    }
    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Req() req: Request, @Body() createUserDto: CreateUserDto): Promise<MainResponse<User>> {
        const createdUser = await this.userService.createUser(createUserDto);
        return new MainResponse(
            UserConstants.USER_CREATED,
            HttpStatus.CREATED,
            req.path,
            createdUser,
        );
    }

    @Put('/:id')
    async updateUser(@Req() req: Request, @Param('id') id: string, @Body() createUserDto: CreateUserDto,): Promise<MainResponse<User>> {
        const updatedUser = await this.userService.updateUser(id, createUserDto);
        return new MainResponse(UserConstants.USER_UPDATED,
            HttpStatus.OK,
            req.path,
            updatedUser);
    }
}
