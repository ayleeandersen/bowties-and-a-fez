from django.shortcuts import render
from django.http import JsonResponse

# from .stroke_command import StrokeCommand
# from .point import Point

def room(request, room_number):
    # command = StrokeCommand(Point(0, 0), Point(300, 200))
    # return JsonResponse(command, safe=False)
    return JsonResponse({'commandType':'stroke', 'start':{'x':'120.7','y':'150'}, 'end':{'x':'1','y':'25'}})