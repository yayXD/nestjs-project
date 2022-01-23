import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: "qwerty123@gnidus.com", description: "Email" })
    readonly email: string;

    @ApiProperty({ example: "123123", description: "Password" })
    readonly password: string;
}