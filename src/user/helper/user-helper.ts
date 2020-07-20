import { SearchUserDto } from "../dto/search-user.dto";

export class UserHelper {
    static prepareQueryOptions(searchUserDto: SearchUserDto) {
        const { query, email, phoneNumber } = searchUserDto;
        let queryCondition = {};
        if (query && email && phoneNumber) {
            queryCondition = { $and: [{ $or: [{ firstName: query }, { lastName: query }] }, { "phoneNumbers.value": phoneNumber }, { email: email }] };
        }
        else if (query && email && !phoneNumber) {
            console.log("from mail qe")

            queryCondition = { $and: [{ $or: [{ firstName: query }, { lastName: query }] }, { email: email }] };
        }
        else if (query && phoneNumber && !email) {
            console.log("from phone que ph")

            queryCondition = { $and: [{ $or: [{ firstName: query }, { lastName: query }] }, { "phoneNumbers.value": phoneNumber }] };
        }
        else if (query && !phoneNumber && !email) {
            console.log("qe")

            queryCondition = { $or: [{ firstName: query }, { lastName: query }] };
        }
        else if (!query && phoneNumber && email) {
            console.log("from ph em")

            queryCondition = { $and: [{ email: email }, { "phoneNumbers.value": phoneNumber }] };
        }
        else if (!query && email && !phoneNumber) {
            console.log("from em")
            queryCondition = { email: email };
        }
        else if (!query && !email && phoneNumber) {
            console.log("from phone num", phoneNumber)
            queryCondition = { "phoneNumbers.value": phoneNumber };
        }
        return queryCondition
    }

}