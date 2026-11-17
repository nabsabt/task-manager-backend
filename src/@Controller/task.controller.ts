import { Controller, Get, Query } from '@nestjs/common';
import { TaskService } from '../@Service/task.service.js';
import { Tasks } from '../@Schema/task.schema.js';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('getTasks')
  public async getTasks(
    @Query()
    params: {
      page: number;
      limit: number;
    },
  ): Promise<{ tasks: Array<Tasks>; datalength: number }> {
    const page: number = Number(params.page);
    const limit: number = Number(params.limit);
    const tasks = await this.taskService.fetchTasksFromDB(page, limit);
    return tasks;
  }
}
