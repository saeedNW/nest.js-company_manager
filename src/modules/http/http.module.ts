import { Global, Module } from '@nestjs/common';
import { EmailService } from './mailer.service';

/**
 * A custom module to manage third-party APIs
 */
@Global()
@Module({
	providers: [EmailService],
	exports: [EmailService],
})
export class HttpClientModule { }
