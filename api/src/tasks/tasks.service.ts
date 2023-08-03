import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ClientKafka } from '@nestjs/microservices'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class TasksService {
    constructor(private prismaService: PrismaService, @Inject("TASK_PRODUCER") private readonly taskProducer: ClientKafka) {

    }

    private getUUID(): string {
        return uuidv4()
    }


    async create(createTaskDto: CreateTaskDto) {
        createTaskDto.taskId = this.getUUID()
        this.taskProducer.emit()
        return this.prismaService.task.create({
            data: createTaskDto,
        });
    }


    async findAll() {
        return this.prismaService.task.findMany()
    }
}
