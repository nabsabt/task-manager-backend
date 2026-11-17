import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from '../@Service/task.service.js';
import { Tasks } from '../@Schema/task.schema.js';
import { Task } from '../@Model/task.manager.interface.js';

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
  ): Promise<{ tasks: Array<{}>; datalength: number }> {
    const page: number = Number(params.page);
    const limit: number = Number(params.limit);
    const tasks = await this.taskService.fetchTasksFromDB(page, limit);
    return tasks;
  }

  @Get('getTask/:id')
  public async getTaskByID(@Param('id') id: string): Promise<{ task: Tasks }> {
    const task = await this.taskService.fetchTaskByID(id);
    if (task) {
      return { task };
    } else {
      throw new NotFoundException('Could not find task!');
    }
  }

  @Post('postEditedTask')
  public async postEditedTask(
    @Body() body: { task: Task },
  ): Promise<{ status: string }> {
    const result = await this.taskService.updateTask(body.task);
    return result;
  }

  @Delete('deleteTask')
  public async deleteTask(
    @Query()
    params: {
      id: string;
    },
  ): Promise<{ status: string }> {
    const result = await this.taskService.deleteTask(params.id);
    return result;
  }
}
