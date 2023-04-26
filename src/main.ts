import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from 'roles.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new RolesGuard());
  
  const config = new DocumentBuilder()
  .setTitle('Documentation')
  .setDescription('Documentation API with CRUD functionality')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
