import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@Length(3, 25)
	@Expose()
	name: string;

	@ApiProperty()
	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	@Expose()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@Length(5, 150)
	@Expose()
	companyName: string;
}
