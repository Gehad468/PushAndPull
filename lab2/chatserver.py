from simple_websocket_server import WebSocket, WebSocketServer
import json

def get_message(message):
    return json.loads(message)

class ChatServer(WebSocket):
    clients = []

    @classmethod
    def broadcast_message(cls, message):
        for client in cls.clients:
            cls.send_message(client, message)

    @staticmethod
    def prepare_message(originMessage):
        message_to_send = {}
        if originMessage["type"] == "login":
            message_to_send['content'] = f"{originMessage['username']} has been connected"
            message_to_send['color'] = "green"
        else:
            message_to_send['content'] = f"{originMessage['username']}: {originMessage['body']}"
        return json.dumps({"body": message_to_send})

    def handle(self):
        print(f"message received: {self.data}")
        msg_content = get_message(self.data)
        self.username = msg_content["username"]
        mes_to_send = self.prepare_message(msg_content)
        ChatServer.broadcast_message(mes_to_send)

    def connected(self):
        print(f"client connected {self.address}")
        ChatServer.clients.append(self)

    def handle_close(self):
        msg = {"content": f"client Disconnected {self.username}", "color": "blue"}
        ChatServer.clients.remove(self)
        msg_to_send = json.dumps(msg)
        ChatServer.broadcast_message(msg_to_send)

if __name__ == "__main__":
    print('SimpleChat server started on port 8700')
    server = WebSocketServer('', 8700, ChatServer)
    server.serve_forever()
