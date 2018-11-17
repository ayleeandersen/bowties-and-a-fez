from threading import Thread, Lock
import os

class Database:
    def __init__(self, room_number):
        self.room_number = room_number

        # Get path to data and create it if doesn't exist
        rooms_path = os.path.dirname(os.path.abspath(__file__))
        rooms_path = os.path.join(rooms_path,'rooms')
        if not os.path.exists(rooms_path):
            os.mkdir(rooms_path)

        # Get path to data file and create it if doesn't exist
        self.file_name = 'rooms/' + str(room_number) + '.json'
        if not os.path.exists(self.file_name):
            open(self.file_name,'w').close()


        self.mutex = Lock()

    def get_queue(self):
        with self.mutex:
            with open(self.file_name, "r") as IN:
                data = ""
                for line in IN:
                    data += line.rstrip()
                return data.split('//split//')[:-1] # Removing last empty object

    def add_command(self,command):
        with self.mutex:
            with open(self.file_name, "a") as OUT:
                OUT.write(command + '//split//')


#doesRoomExist
