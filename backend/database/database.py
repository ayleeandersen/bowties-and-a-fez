from threading import Thread, Lock

class Database:
    def __init__(self, room_number):
        self.room_number = room_number
        self.file_name = 'rooms/' + str(room_number) + '.json'
        self.mutex = Lock()

    def get_queue(self):
        with self.mutex:
            with open(self.file_name, "r") as IN:
                return '[' + IN.read() + ']'

    def add_command(self,command):
        with self.mutex:
            with open(self.file_name, "a") as OUT:
                OUT.write(command + ',')
