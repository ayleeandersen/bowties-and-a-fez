from flask import jsonify

from flask import Flask
app = Flask(__name__)

class Point():

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def jsonify(self):
        return {'x':str(self.x), 'y':str(self.y)}

class DrawCommand():
    pass

class StrokeCommand():

    def __init__(self, start, end):
        self.start = start
        self.end = end

    def jsonify(self):
        return {'commandType':'stroke', 'start':self.start.jsonify(), 'end':self.start.jsonify()}

@app.route('/api/<int:room_number>')
def room(room_number):
   return jsonify(StrokeCommand(Point(150, 120), Point(20, 25)).jsonify())

if __name__ == '__main__':
   app.run()