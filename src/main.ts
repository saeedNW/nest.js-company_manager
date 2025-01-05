import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './common/Filters/exception.filter';
import { UnprocessableEntityPipe } from './common/pipe/unprocessable-entity.pipe';
import { ResponseTransformerInterceptor } from './common/interceptor/response-transformer.interceptor';
import { swaggerConfiguration } from './config/swagger.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Config CORS policy
	app.enableCors({
		origin: "*", // Replace with the front-end origin in production
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
		allowedHeaders: ["Content-Type", "Authorization"],  // Include Authorization for potential future use
		credentials: true, // Enable credentials for handling cookies or authentication
	});

	// Initialize custom exception filter
	app.useGlobalFilters(new HttpExceptionFilter());
	// Initialize custom unprocessable entity pipe
	app.useGlobalPipes(new UnprocessableEntityPipe());
	// Initialize custom response interceptor
	app.useGlobalInterceptors(new ResponseTransformerInterceptor());
	// Initialize Swagger
	swaggerConfiguration(app);

	await app.listen(process.env.PORT ?? 3000, () => {
		console.log('App is running on http://localhost:3000');
	});
}
bootstrap();
