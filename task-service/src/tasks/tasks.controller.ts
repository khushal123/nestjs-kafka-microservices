import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Post()
    async createTask(@Body() taskBody: CreateTaskDto) {
        try {
            return await this.taskService.create(taskBody)
        } catch (error) {
            console.error(error)
            return error
        }
    }

    @Get()
    async getAllTasksStatus() {
        return await this.taskService.findAll()
    }

    @Get(":id")
    async getTask(@Param() idDto: IdDto) {
        return await this.taskService.getTask(idDto.id)
    }


    @Patch(":id")
    async updateTaskStatus(@Param() idDto: IdDto, @Body() taskBody: TaskBodyDto) {
        return await this.taskService.updateTaskStatus(idDto.id, taskBody.status)
    }
}
