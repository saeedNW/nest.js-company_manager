import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

@Schema()
export class Company {
	@Prop({ required: true })
	companyName: string;
	@Prop({
		type: mongooseSchema.Types.ObjectId,
		ref: "User",
	})
	user: User;
}

export type CompanyDocument = HydratedDocument<Company>;
export const CompanySchema = SchemaFactory.createForClass(Company);
