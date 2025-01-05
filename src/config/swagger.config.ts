import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * initialize swagger document
 * @param app NestJS Application instance
 */
export function swaggerConfiguration(app: INestApplication) {
	// define the swagger options and configs
	const document = new DocumentBuilder()
		.setTitle('Company Management API DOC')
		.setDescription('Management system for companies and their owners')
		.setVersion('1.0.0')
		.build();

	// Initialize swagger document based on defined options
	const swaggerDocument = SwaggerModule.createDocument(app, document);

	// setup swagger ui page
	SwaggerModule.setup('/api-doc', app, swaggerDocument);
}
