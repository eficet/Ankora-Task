export interface PhoneNumber {
    phoneType: PhoneNumberType;
    value: string;
}

export enum PhoneNumberType {
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECODARY'
}