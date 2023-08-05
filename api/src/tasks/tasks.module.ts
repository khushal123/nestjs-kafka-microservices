import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  controllers: [TasksController],
  imports: [
    PrismaModule,
    ClientsModule.register([{
      name: "KAFKA_SERVICE",
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
    }])
  ],
  providers: [TasksService, PrismaService]
})
export class TasksModule { }
