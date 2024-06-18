import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateLeadDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    Budget: string;

    @IsNotEmpty()
    @IsString()
    Status: string;

    @IsNotEmpty()
    @IsString()
    Responsible: string;

    @IsNotEmpty()
    contacts: CreateContactDto[];
}

export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber('RU') // Замените 'RU' на код страны, если нужно
    phone: string;
}
