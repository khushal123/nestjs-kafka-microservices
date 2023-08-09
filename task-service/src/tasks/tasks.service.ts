import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskStatusDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {

    constructor(private readonly prismaService: PrismaService, private httpService: HttpService, private configService: ConfigService) {
    }

    private getUUID(): string {
        return uuidv4()
    }

    async create(createTaskDto: CreateTaskDto) {
        try {
            createTaskDto.taskId = this.getUUID()
            console.log(createTaskDto)
            const task = await this.prismaService.task.create({
                data: createTaskDto
            })
            return task
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async getTask(id: number) {
        try {
            return await this.prismaService.task.findFirst({where: {
                id: Number(id)
            }})
        } catch (error) {
            console.error(error)
            return error
        }
    }



    private getTaskStatus(status: string): TaskStatusDto {
        const taskStatus = {
            "COMPLETED": TaskStatusDto.COMPLETED,
            "FAILED": TaskStatusDto.FAILED,
            "RUNNING": TaskStatusDto.RUNNING
        }
        console.log(taskStatus[status])
        return taskStatus[status]
    }

    async updateTaskStatus(id: number, status: string) {
        try {
            const task = await this.prismaService.task.update({
                where: {
                    id: Number(id),
                },
                data: {
                    status: this.getTaskStatus(status),
                },
            })
            await this.updateTaskStatusToApi(id, status)
            return task
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async updateTaskStatusToApi(id: number, status: string) {
        try {
            const url = `${this.configService.get("API_SERVICE_URL")}/tasks/${id}`
            console.log(this.configService.get("API_SERVICE_URL"), "API_SERVICE_URL")
            const apiCall = await this.httpService.axiosRef.patch(url, {
                status
            })
            return apiCall
        } catch (error) {
            console.error(error)
            return error
        }
    }

    async findAll() {
        return await this.prismaService.task.findMany()
    }
}
