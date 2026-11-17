import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import type { Connection, Model } from 'mongoose';
import { Tasks } from '../@Schema/task.schema.js';

@Injectable()
export class TaskService {
  private taskConnection;
  constructor(
    @InjectModel(Tasks.name) private taskModel: Model<Tasks>,
    @InjectConnection() private connection: Connection,
  ) {
    this.taskConnection = this.connection.collection<Tasks>(
      this.taskModel.collection.name,
    );
  }

  public async fetchTasksFromDB(
    page: number,
    limit: number,
  ): Promise<{ tasks: Array<Tasks>; datalength: number }> {
    const datalength = await this.taskConnection.countDocuments();
    const tasks = await this.taskConnection
      .find({})
      .skip(page * limit)
      .limit(limit)
      .toArray();

    return { tasks, datalength };
  }
}
