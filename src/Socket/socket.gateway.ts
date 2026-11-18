import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { SocketData } from '../@Model/task.manager.interface.js';

@WebSocketGateway(8988, {
  cors: { origin: ['http://localhost:4200'] },
  path: '/socket.io',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  sendDataChangeMessage(messagePayload: SocketData): string {
    this.server.emit('dataChangeMessage', messagePayload);
    return 'Something changed on backend.';
  }

  handleConnection(client: any, ...args: any[]) {
    Logger.log('Websocket connection created...');
  }
  handleDisconnect(client: any, reason?: string) {
    Logger.log('Websocket connection lost...');
  }
}
