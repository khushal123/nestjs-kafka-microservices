import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { GatewayModule } from 'src/gateway/gateway.module';
@Module({
  controllers: [TasksController],
  providers: [TasksService, ConfigService],
  imports: [HttpModule, GatewayModule]
})
export class TasksModule { }
