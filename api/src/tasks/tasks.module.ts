import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { TasksService } from './tasks.service';
@Module({
  controllers: [TasksController],
  imports: [
    ClientsModule.register([{
      name: "TASK_SERVICE",
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: "client-task-worker",
          brokers: ["kafka:9092"]
        },
        consumer: {
          groupId: "tasks-consumer"
        }
      }
    }]),
  ],
  providers: [TasksService]
})
export class TasksModule { }
