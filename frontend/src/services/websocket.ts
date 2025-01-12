export class ChatWebSocket {
  private ws: WebSocket;
  private messageHandler: (message: string) => void;

  constructor(roomName: string, onMessage: (message: string) => void) {
    this.ws = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
    this.messageHandler = onMessage;
    this.setupListeners();
  }

  private setupListeners() {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageHandler(data.message);
    };
  }

  public sendMessage(message: string) {
    this.ws.send(JSON.stringify({ message }));
  }

  public disconnect() {
    this.ws.close();
  }
}
