import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid'
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TasksService {
    constructor(
        @Inject("KAFKA_SERVICE") private producerService: ClientKafka,
        private prismaService: PrismaService) {
    }

    private getUUID(): string {
        return uuidv4()
    }


    async create(createTaskDto: CreateTaskDto) {
        createTaskDto.taskId = this.getUUID()
        const task: CreateTaskDto = await this.prismaService.task.create({
            data: createTaskDto,
        });
        
        return createTaskDto
    }


    async findAll() {
        return this.prismaService.task.findMany()
    }
}
