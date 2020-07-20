import { PhoneNumber } from "../../user/phoneNumber.class"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export class SeedHelper {
    static preparePhoneNumbers(seedPhonenumber): PhoneNumber {
        return {
            phoneType: seedPhonenumber.phoneNumbers[0].type.toUpperCase(),
            value: seedPhonenumber.phoneNumbers[0].value
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