import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Post()
    async createTask(@Body() taskBody: any) {
        return this.taskService.create(taskBody)
    }

    @Get()
    async getAllTasksStatus() {
        return this.taskService.findAll()
    }

    @Patch(":id")
    async updateTaskStatus(@Param() idDto: IdDto, @Body() taskBody: TaskBodyDto) {
        return await this.taskService.updateTaskStatus(idDto.id, taskBody.status)
    }
}
