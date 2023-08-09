import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AppService {

  constructor(private httpService: HttpService, private configService: ConfigService) {

  }

  async handleTaskCreated(data: Record<string, string>) {
    const id = Number(data["id"]);
    try {
      const num = Number(data["numOfTasks"]);

      const task = this.generateTasks(num);
      for (let fn of task) {
        fn();
      }
      await this.updateTaskStatus(id, "COMPLETED")
      console.log("task done")
    } catch (error) {
      await this.updateTaskStatus(id, "FAILED")
      console.error(error)
    }
  }

  * generateTasks(num: number) {
    for (let i = 0; i < num; i++) {
      yield async () => await this.sendEnail(i);
    }
  }

  async sendEnail(id: number) {
    console.log(`sending email ${id}`)
  }
  private async updateTaskStatus(id: number, status: string) {
    try {
      const url = `${this.configService.get("TASK_SERVICE_BASE_URL")}/tasks/${id}`
      const task = await this.httpService.axiosRef.patch(url, {
        status
      })
      return task
    } catch (error) {
      return error
    }
  }
}
