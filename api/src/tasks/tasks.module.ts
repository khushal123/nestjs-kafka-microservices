import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [TasksController],
  providers: [TasksService, ConfigService]
})
export class TasksModule { }
