import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "./db/user.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UserHelper } from "./helper/user-helper";
import { UserConstants } from "./helper/user-constants";

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) { }
    async getAllUsers(): Promise<User[]> {
        let users;
        try {
            users = await this.userModel.find();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
        console.log("Users", users.length)
        if (!users || users.length === 0) {
            throw new NotFoundException(UserConstants.USERS__NOT_FOUND);

        }
        return users;
    }

    async getUserById(id: string): Promise<User> {
        let user;
        try {
            user = await this.userModel.findOne({ _id: id });
        }
        catch (err) {
            throw new InternalServerErrorException(err.message);
        }
        if (!user) {
            throw new NotFoundException(UserConstants.USER_NOT_FOUND);
        }
        return user;
    }

    async getUserByEmail(searchMail: string): Promise<User> {
        return await this.userModel.findOne({ email: searchMail });
    }

    async insertManyUsers(users: User[]): Promise<User[]> {
        const createdUsers = await this.userModel.insertMany(users, { ordered: false });
        return createdUsers;
    }

    async getUsersWithFilters(searchUserDto: SearchUserDto): Promise<User[]> {
        const queryConditions = UserHelper.prepareQueryOptions(searchUserDto);
        let users;
        try {
            users = await this.userModel.find(queryConditions);
        }
        catch (err) {
            throw new InternalServerErrorException(err);
        }
        if (!users || users.length === 0) {
            throw new NotFoundException(UserConstants.USERS__NOT_FOUND);

        }
        return users;
    }
    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        try {
            return await newUser.save();
        }
        catch (err) {
            throw new BadRequestException(err.message);
        }
    }
    async updateUser(id: string, createUserDto: CreateUserDto): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, createUserDto, { new: true, useFindAndModify: false })
    }
}