import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Company, CompanyDocument } from './schema/company.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UserService } from '../user/user.service';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class CompanyService {
	constructor(
		// Inject the company model
		@InjectModel(Company.name)
		private companyModel: Model<CompanyDocument>,

		// Inject the user model
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,

		// Inject UserService while avoiding circular dependency
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
	) { }

	/**
	 * New company registration
	 * @param {CreateCompanyDto} createCompanyDto - The data transfer object containing company registration details.
	 */
	async create(createCompanyDto: CreateCompanyDto) {
		// Extract user id from request data
		const { user } = createCompanyDto;
		// Check user's existence
		await this.userService.findOne(user);
		// Add new company's data to then database
		const company = await this.companyModel.create({ ...createCompanyDto });
		// Update user's data and add new company
		await this.userModel.updateOne({ _id: user }, { $push: { companies: company } })

		return company;
	}

	/**
	 * New company registration
	 * This method will be use in user registration process
	 * @param {CreateCompanyDto} createCompanyDto - The data transfer object containing company registration details.
	 */
	async AddCompany(createCompanyDto: CreateCompanyDto) {
		return (await this.companyModel.create({ ...createCompanyDto }));
	}
}
