import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, TasksModule, ConfigModule.forRoot({
    envFilePath: ["../.env"],
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule { }
