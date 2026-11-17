import { Controller, Get } from '@nestjs/common';
import { TaskService } from '../@Service/task.service.js';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('getTasks')
  public async getTasks(): Promise<Array<any>> {
    const tasks = await this.taskService.fetchTasksFromDB();
    return tasks;
  }
}
