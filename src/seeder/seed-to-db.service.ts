import { Injectable, BadRequestException } from '@nestjs/common';
import { userData, phoneNumbersSeedData } from './data/user-seeds';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/db/user.interface';
import { SeedHelper } from './hepler/seed-helper';
import { SeederConstants } from './hepler/seeder-constants';

@Injectable()
export class SeedToDatabaseService {
    constructor(private readonly userSevice: UserService) { }

    async seedData(): Promise<User[]> {
        const usersToCreate: CreateUserDto[] = [];
        await this.asyncForEach(userData, async user => {
            let checkedUser;
            try {
                checkedUser = await this.userSevice.getUserByEmail(user.email);
            } catch (err) {
                console.log(err);
            }
            if (!checkedUser) {
                const myUser = SeedHelper.prepareUser(user);
                try {
                    usersToCreate.push(myUser);
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log(
                    'Email: ' + user.email + SeederConstants.AREADY_EXIST_IN_DB,
                );
            }
        });
        return await this.checkAndCombineData(usersToCreate);
    }

    private async checkAndCombineData(usersToCreate): Promise<User[]> {
        if (usersToCreate && usersToCreate.length > 0) {
            await phoneNumbersSeedData.forEach(data => {
                const userToCreate = usersToCreate.find(
                    user => user.email === data.email,
                );
                const mapedPhoneNumbers = SeedHelper.preparePhoneNumbers(data);
                userToCreate.phoneNumbers.push(mapedPhoneNumbers);
            });
            try {
                const createdUsers = await this.userSevice.insertManyUsers(usersToCreate);
                console.log(SeederConstants.SEEDED_TO_DB, createdUsers);
                return createdUsers;
            } catch (err) {
                console.log(err);
                throw new BadRequestException(err);
            }
        } else {
            console.log(SeederConstants.NO_DATA_OR_EMPTY);
            throw new BadRequestException(SeederConstants.NO_DATA_OR_EMPTY);
        }
    }

    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}
