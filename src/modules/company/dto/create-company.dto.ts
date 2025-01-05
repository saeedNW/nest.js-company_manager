import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString, Length } from "class-validator";


export class CreateCompanyDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@Length(5, 150)
	@Expose()
	companyName: string;

	@ApiProperty()
	@IsMongoId()
	@IsNotEmpty()
	@Expose()
	user: string;
}
