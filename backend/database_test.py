from .database import Database

room = Database(150)

print(room.get_queue())

room.add_command('{"commandType":"Stroke", "start":{"x":"10","y":"1"}, "end":{"x":"10","y":"10"} }')

print(room.get_queue())
