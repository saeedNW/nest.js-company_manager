import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { Company } from 'src/modules/company/schema/company.schema';

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	name: string;
	@Prop({ required: true, unique: true })
	email: string;
	@Prop({ type: [{ type: mongooseSchema.Types.ObjectId, ref: 'Company' }] })
	companies: Company[];
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
