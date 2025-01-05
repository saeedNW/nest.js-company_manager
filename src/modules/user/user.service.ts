import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CompanyService } from '../company/company.service';
import { EmailService } from '../http/mailer.service';

@Injectable()
export class UserService {
	constructor(
		// Inject the User model
		@InjectModel(User.name)
		private userModel: Model<UserDocument>,
		// Inject company service
		private readonly companyService: CompanyService,
		// Inject company service
		private readonly emailService: EmailService
	) { }

	/**
	 * New user Registration
	 * @param {CreateUserDto} createUserDto - The data transfer object containing user registration details.
	 */
	async createUser(createUserDto: CreateUserDto) {
		// Destructure register dto properties
		let { email, CompanyName } = createUserDto;
		// Check for duplicated email address
		await this.duplicatedEmail(email);
		// Create new user document
		let user = new this.userModel({ ...createUserDto });
		// Add new company for user
		const company = await this.companyService.AddCompany({ CompanyName, user: user._id.toHexString() });
		// Add company id to user data
		user.Companies.push(company);
		// Save user data to database
		user = await user.save();
		// send welcome email
		await this.emailService.sendEmail(email);

		return {
			message: "User has been created successfully",
			user
		}
	}

	/**
	 * Retrieve single user data
	 * @param {string} id - User's ObjectID
	 */
	async findOne(id: string) {
		// Retrieve user's data from database
		const user = await this.userModel.findById(id).populate([{
			path: "Companies",
			select: ["_id", "CompanyName"]
		}]);
		// throe error if user was not found
		if (!user) {
			throw new NotFoundException("This user was not found");
		}

		return user
	}

	/**
	 * Check for duplicated email address
	 * @param {string} email - User's email address
	 */
	private async duplicatedEmail(email: string) {
		// Check for duplicated email address
		const user = await this.userModel.findOne({ email });
		// Throw error if email was duplicated address
		if (user) {
			throw new ConflictException("Duplicated email address");
		}
	}
}
