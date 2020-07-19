import { SearchUserDto } from "../dto/search-user.dto";

export class UserHelper {
    static prepareQueryOptions(searchUserDto: SearchUserDto) {
        const { query, email, phoneNumber } = searchUserDto;
        let queryCondition = {};
        if (query && email && phoneNumber) {
            queryCondition = { $and: [{ $or: [{ name: query }, { surname: query }] }, { "phoneNumbers.value": phoneNumber }, { email: email }] };
        }
        else if (query && email && !phoneNumber) {
            queryCondition = { $and: [{ $or: [{ name: query }, { surname: query }] }, { email: email }] };
        }
        else if (query && phoneNumber && !email) {
            queryCondition = { $and: [{ $or: [{ name: query }, { surname: query }] }, { "phoneNumbers.value": phoneNumber }] };
        }
        else if (query && !phoneNumber && !email) {
            queryCondition = { $or: [{ name: query }, { surname: query }] };
        }
        else if (!query && phoneNumber && email) {
            queryCondition = { $and: [{ email: email }, { "phoneNumbers.value": phoneNumber }] };
        }
        else if (!query && email && !phoneNumber) {
            queryCondition = { email: email };
        }
        else if (!query && !email && phoneNumber) {
            queryCondition = { "phoneNumbers.value": email };
        }
        return queryCondition
    }

}