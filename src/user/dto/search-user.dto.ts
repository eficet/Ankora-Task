import { IsOptional, IsNotEmpty } from 'class-validator'
export class SearchUserDto {
    @IsOptional()
    @IsNotEmpty()
    public query: string;
    @IsOptional()
    @IsNotEmpty()
    public email: string;
    @IsOptional()
    @IsNotEmpty()
    public phoneNumber: string;
}