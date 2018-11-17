import websockets
import asyncio
import sys

from database import Database


rooms = dict()
clients = set()

class Client:

    def __init__(self, websocket, room_id):
        self.websocket = websocket
        self.room_id = room_id

    async def send(self, message):
        await self.websocket.send(message)

    async def send_all(self, messages):
        await asyncio.wait([self.websocket.send(message) for message in messages])

    async def read(self):
        return await self.websocket.recv()


async def connect(websocket, path):
    # Read room id
    room_id = await websocket.recv()
    client = Client(websocket, room_id)
    clients.add(client)
    
    print("Client connected to room", room_id)

    database = Database(room_id)

    # Send all previous JSON
    if database.get_queue():
        past_json = database.get_queue()
        client.send_all(past_json)

    # Receive messages from the client and send to other clients in the same room
    while True:
        command = client.read()
        database.add_command(command)
        await asyncio.wait([client.send(command) for client in clients if client.room_id == room_id])

    # Remove the client and close the socket
    clients.remove(client)
    websocket.close()

if __name__ == '__main__':
    start_server = websockets.serve(connect, '127.0.0.1', 5005, origins='localhost:*')

    asyncio.get_event_loop().run_until_complete(start_server)
    try:
        asyncio.get_event_loop().run_forever()
    except KeyboardInterrupt:
        sys.exit()