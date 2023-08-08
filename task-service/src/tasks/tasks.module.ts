import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TasksController } from './tasks.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers:[TasksController],
  providers: [TasksService, PrismaService],
  imports: [PrismaModule, HttpModule]
})
export class TasksModule { }
