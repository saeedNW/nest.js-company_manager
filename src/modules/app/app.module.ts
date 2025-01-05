import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { CompanyModule } from '../company/company.module';
import { HttpClientModule } from '../http/http.module';

@Module({
	imports: [
		/** Initialize database connection */
		MongooseModule.forRoot("mongodb://127.0.0.1:27017/company_manager"),

		UserModule,
		CompanyModule,
		HttpClientModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule { }
