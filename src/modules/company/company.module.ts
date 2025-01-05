import { forwardRef, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schema/company.schema';
import { CompanyController } from './company.controller';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		/** Register user schema */
		MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
		// Import user module while avoiding circular dependency
		forwardRef(() => UserModule)
	],
	controllers: [CompanyController],
	providers: [CompanyService],
	exports: [MongooseModule, CompanyService]
})
export class CompanyModule { }
