import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {

  constructor(private httpService: HttpService, private configService: ConfigService) {
    
  }

  async handleTaskCreated(data: Record<string, unknown>, consumerService: ClientKafka) {
    try {

    } catch (error) {
      throw error
    }
  }
}
