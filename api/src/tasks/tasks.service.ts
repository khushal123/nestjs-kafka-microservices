import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class TasksService implements OnModuleInit, OnModuleDestroy {

    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'myApp',
                brokers: ['localhost:9094'],
            },
            consumer: { groupId: 'myGroup' },
        },
    })
    producerService: ClientKafka

    constructor() {

    }


    async onModuleDestroy() {
        await this.producerService.close()
    }

    async onModuleInit() {
        await this.producerService.subscribeToResponseOf("taskrunner")
        await this.producerService.connect()
    }

    async create(createTaskDto: CreateTaskDto) {
        try {

        } catch (error) {
            throw error
        }
    }

    async findAll() {
    }

    async updateTaskStatus(id: number, status: string) {
        try {
            return { id, status }
        } catch (error) {
            throw error
        }
    }
}
