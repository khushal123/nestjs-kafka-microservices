import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices'

@Controller('tasks')
export class TasksController {
    constructor() { }

    @Post()
    async createTask(@Body() taskBody: any) {
        
    }
}
