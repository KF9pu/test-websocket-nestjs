import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // CORS 설정: 모든 도메인에서 접근 허용
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // 클라이언트가 소켓 서버에 연결되었을 때
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // 클라이언트가 소켓 서버에서 연결 해제되었을 때
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // 'message' 이벤트를 처리하는 함수
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(`Message received: ${message}`);
    this.server.emit('message', message); // 모든 클라이언트에게 메시지 전송
  }
}
