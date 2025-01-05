import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { UserIdDto } from './dto/id.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
	constructor(private readonly userService: UserService) { }

	/**
	 * New user Registration
	 * @param {CreateUserDto} createUserDto - The data transfer object containing user registration details.
	 */
	@Post()
	@ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
	createUser(@Body() createUserDto: CreateUserDto) {
		// filter and reformat client data and remove unwanted data
		createUserDto = plainToClass(CreateUserDto, createUserDto, {
			excludeExtraneousValues: true,
		});

		return this.userService.createUser(createUserDto);
	}

	/**
	 * Retrieve single user data
	 * @param id - User's ObjectID
	 */
	@Get("/:id")
	findOne(@Param() { id }: UserIdDto) {
		return this.userService.findOne(id);
	}

}
