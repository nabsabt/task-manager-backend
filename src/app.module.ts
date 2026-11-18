import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Tasks, TaskSchema } from './@Schema/task.schema.js';
import { TaskService } from './@Service/task.service.js';
import { TaskController } from './@Controller/task.controller.js';
import { AuthController } from './@Controller/auth.controller.js';
import { AuthService } from './@Service/auth.service.js';
import { SocketGateway } from './Socket/socket.gateway.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_CONNECTION'),
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      {
        name: Tasks.name,
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [TaskController, AuthController],
  providers: [TaskService, AuthService, SocketGateway],
})
export class AppModule {
  constructor() {}
}
