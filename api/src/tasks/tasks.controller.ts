import { Body, Controller, Inject, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Post()
    async createTask(@Body() taskBody: any) {
        return this.taskService.create(taskBody)
    }
}
