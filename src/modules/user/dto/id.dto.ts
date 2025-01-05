import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsMongoId, IsNotEmpty } from "class-validator";


export class UserIdDto {
	@ApiProperty()
	@IsMongoId()
	@IsNotEmpty()
	@Expose()
	id: string;
}
