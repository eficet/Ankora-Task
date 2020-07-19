import { PhoneNumber } from "../../user/phoneNumber.class"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export class SeedHelper {
    static preparePhoneNumbers(seedPhonenumber): PhoneNumber {
        return {
            phoneType: seedPhonenumber.phoneNumbers[0].type,
            value: seedPhonenumber.phoneNumbers[0].value
        }
    }
    static prepareUser(user): CreateUserDto {
        return {
            name: user.firstName,
            surname: user.lastName,
            email: user.email,
            phoneNumbers: []
        }
    }
}