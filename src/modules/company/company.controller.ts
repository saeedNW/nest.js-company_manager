import { Body, Controller, Post } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { CreateCompanyDto } from './dto/create-company.dto';
import { plainToClass } from 'class-transformer';

@Controller('company')
@ApiTags('Company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) { }

	/**
	 * New company registration
	 * @param {CreateCompanyDto} createCompanyDto - The data transfer object containing company registration details.
	 */
	@Post()
	@ApiConsumes(SwaggerConsumes.URL_ENCODED, SwaggerConsumes.JSON)
	create(@Body() createCompanyDto: CreateCompanyDto) {
		// filter and reformat client data and remove unwanted data
		createCompanyDto = plainToClass(CreateCompanyDto, createCompanyDto, {
			excludeExtraneousValues: true,
		});

		return this.companyService.create(createCompanyDto);
	}

}
