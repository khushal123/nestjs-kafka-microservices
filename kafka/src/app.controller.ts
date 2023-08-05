import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern("task_created")
  async handleTaskCreated(data: Record<string, unknown>) {
    console.log(data)
  }
}
