import { Type } from "class-transformer";
import { IsNumber, IsNumberString } from "class-validator";

export class CreateTaskDto {
    @IsNumber()
    @Type(() => Number)
    numOfTasks: any
    taskId: string
}

export class TaskDto {

}

export enum TaskStatusDto {
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}