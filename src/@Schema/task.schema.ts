import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Tasks' })
export class Tasks {
  @Prop()
  name: string;

  @Prop()
  status: 'todo' | 'inprogress' | 'done';

  @Prop()
  description: string;
}

export const TaskSchema = SchemaFactory.createForClass(Tasks);
