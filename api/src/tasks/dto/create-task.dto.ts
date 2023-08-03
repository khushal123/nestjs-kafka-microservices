import { ApiProperty } from "@nestjs/swagger"

export class CreateTaskDto {
    @ApiProperty()
    numOfTasks: number
    taskId: string
}
