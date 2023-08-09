
export class CreateTaskDto {
    numOfTasks: number
}

export class TaskDto extends CreateTaskDto {
    status: Status
    createdAt: Date
    updatedAt: Date
}

enum Status {
    COMPLETED,
    FAILED,
    RUNNING
}