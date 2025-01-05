/**
 * Service responsible for handling email sending operations.
 */
export class EmailService {
	/**
	 * This is a mock implementation that simulates a long-running process.
	 * @param {string} email - The email address of the recipient.
	 */
	async sendEmail(email: string) {
		console.log(email);
		await new Promise((resolve) => setTimeout(resolve, 3000));
	}
}
