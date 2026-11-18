import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Mongoose, type Connection, type Model } from 'mongoose';
import { Tasks } from '../@Schema/task.schema.js';
import { Task } from '../@Model/task.manager.interface.js';

@Injectable()
export class TaskService {
  private taskConnection;
  private mongoose = new Mongoose();
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
  ): Promise<{ tasks: Array<{}>; datalength: number }> {
    try {
      const datalength = await this.taskConnection.countDocuments();
      const tasks = await this.taskConnection
        .find({})
        .skip(page * limit)
        .limit(limit)
        .toArray();

      return { tasks, datalength };
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Could not fetch tasks. Details: ${error.toString()}`,
      );
    }
  }

  public async fetchTaskByID(id: string): Promise<Tasks | null> {
    const _id = new this.mongoose.Types.ObjectId(id);
    try {
      const task = await this.taskConnection.findOne({ _id: _id });
      return task;
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Could not fetch task ${id}. Details: ${error.toString()}`,
      );
    }
  }

  public async updateTask(task: Task): Promise<{ status: string }> {
    if (task._id) {
      /**
       * update task->
       */
      const _id = new this.mongoose.Types.ObjectId(task._id);
      try {
        const update = await this.taskConnection.updateOne(
          { _id: _id },
          {
            $set: {
              name: task.name,
              description: task.description,
              status: task.status,
            },
          },
        );
        if (update.modifiedCount > 0) {
          return { status: `Successfully updated task ${task._id}` };
        } else {
          return { status: `Nothing happened!` };
        }
      } catch (error: any) {
        throw new InternalServerErrorException(
          `Could not modify task ${task._id}. Details: ${error.toString()}`,
        );
      }
    } else {
      /**
       * insert new task
       */
      try {
        const newTask: Tasks = {
          name: task.name,
          status: task.status,
          description: task.description,
        };
        const insert = await this.taskConnection.insertOne(newTask);
        if (insert.insertedId) {
          return { status: `Successfully added new task ${insert.insertedId}` };
        } else {
          return {
            status: `Could not insert new task ${task.name}, no change happened.`,
          };
        }
      } catch (error: any) {
        throw new InternalServerErrorException(
          `Could not add new task ${task.name}. Details: ${error.toString()}`,
        );
      }
    }
  }

  public async deleteTask(id: string): Promise<{ status: string }> {
    const _id = new this.mongoose.Types.ObjectId(id);
    try {
      const deleted = await this.taskConnection.deleteOne({ _id: _id });
      if ((deleted.deletedCount = 1)) {
        return { status: `Successfully deleted task ${id}` };
      } else {
        return { status: `No task found with this id! nothing happened!` };
      }
    } catch (error: any) {
      throw new InternalServerErrorException(
        `Could not modify task ${id}. Details: ${error.toString()}`,
      );
    }
  }
}
