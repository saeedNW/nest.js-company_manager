import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { CompanyModule } from '../company/company.module';

@Module({
	imports: [
		/** Register user schema */
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
		// Import company module while avoiding circular dependency
		forwardRef(() => CompanyModule),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [MongooseModule, UserService]
})
export class UserModule { }
