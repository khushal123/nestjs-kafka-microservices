import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CreateTaskDto, TaskDto } from './dto/create-task.dto';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { GatewayService } from 'src/gateway/gateway.service';

@Injectable()
export class TasksService implements OnModuleDestroy, OnModuleInit {

    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'myApp',
                brokers: (process.env.KAFKA_BROKERS).split(',')
            },
            consumer: { groupId: 'myGroup' },
        },
    })
    producerService: ClientKafka

    KAFKA_TASKRUNNER: string = null

    constructor(private httpService: HttpService, private configService: ConfigService, private gatewayService: GatewayService) {
        this.KAFKA_TASKRUNNER = configService.get("KAFKA_TASKRUNNER")
    }


    async onModuleDestroy() {
        await this.producerService.close()
    }

    async onModuleInit() {
        this.producerService.subscribeToResponseOf(this.KAFKA_TASKRUNNER)
        await this.producerService.connect()
    }
    async create(createTaskDto: CreateTaskDto) {
        try {
            const url = `${this.configService.get("TASK_SERVICE_BASE_URL")}tasks/`
            console.log(createTaskDto)
            const apiCall = await this.httpService.axiosRef.post(url, createTaskDto)
            const createdTask: TaskDto = apiCall.data
            this.producerService.emit(this.KAFKA_TASKRUNNER, createdTask)
            return createdTask
        } catch (error) {
            // console.error(error)
            throw error
        }
    }


    async getTask(id: number) {
        try {
            const url = `${this.configService.get("TASK_SERVICE_BASE_URL")}tasks/${id}`
            const apiCall = await this.httpService.axiosRef.get(url)
            const taskList: Array<TaskDto> = apiCall.data
            return taskList
        } catch (error) {
            throw error
        }
    }


    async findAll() {
        try {
            const url = `${this.configService.get("TASK_SERVICE_BASE_URL")}tasks`
            console.log(url)
            const apiCall = await this.httpService.axiosRef.get(url)
            const taskList: Array<TaskDto> = apiCall.data
            return taskList
        } catch (error) {
            throw error
        }
    }

    async updateTaskStatus(id: number, status: string) {
        try {
            await this.gatewayService.emitMessage({
                id,
                status
            })
            return true
        } catch (error) {
            throw error
        }
    }
}
