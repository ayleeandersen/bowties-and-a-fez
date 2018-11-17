from simple_websocket_server import WebSocketServer, WebSocket
from database import Database
import json

queue = []

def queue_to_string():
    string = ""
    for item in queue:
        string += '[' + item.rstrip("']").lstrip("['") +'],'
    string = string[:-1]
    return string

class SimpleChat(WebSocket):
    def handle(self):
        queue.append(self.data)
        for client in clients:
            if client != self:
                client.send_message(self.data)


    def connected(self):
        print(self.address, 'connected')
        if queue:
            self.send_message(queue_to_string())
        clients.append(self)

    def handle_close(self):
        clients.remove(self)
        print(self.address, 'closed')


clients = []

server = WebSocketServer('127.0.0.1', 5000, SimpleChat)
server.serve_forever()
