import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksServiceService } from './tasks/tasks-service.service';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService, TasksServiceService],
})
export class AppModule {}
