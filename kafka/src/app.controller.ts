import { Controller, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { Client, ClientKafka, EventPattern, Transport } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'myApp',
        brokers: (process.env.KAFKA_BROKERS).split(","),
      },
      consumer: { groupId: 'myGroup' },
    },
  })
  consumerService: ClientKafka

  async onModuleInit() {
    await this.consumerService.connect()
  }

  async onModuleDestroy() {
    await this.consumerService.close()
  }

  constructor(private readonly appService: AppService) { }

  @EventPattern("taskrunner")
  async handleTaskCreated(data: Record<string, string>) {
    return this.appService.handleTaskCreated(data)
  }
}
