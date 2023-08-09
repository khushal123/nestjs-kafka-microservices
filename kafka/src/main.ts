import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const brokers = (process.env.KAFKA_BROKERS).split(',');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: brokers,
      }
    }
  });
  app.listen()

}
bootstrap();
