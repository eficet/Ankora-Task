import { PhoneNumber } from "../../user/db/phoneNumber.interface"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export class SeedHelper {
    static preparePhoneNumbers(seedPhonenumber): PhoneNumber {
        return {
            phoneType: seedPhonenumber.type.toUpperCase(),
            value: seedPhonenumber.value
        }
    }
    static prepareUser(user): CreateUserDto {
        return {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumbers: []
        }
    }
}