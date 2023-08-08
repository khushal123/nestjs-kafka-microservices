
export class CreateTaskDto {
    numOfTasks: number
    taskId: string
}

export class TaskDto {

}

export enum TaskStatusDto {
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}