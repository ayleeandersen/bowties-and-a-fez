import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';
import { DrawComponent, Point } from '../draw/draw.component';
import { StrokeComponent } from '../draw/stroke/stroke.component';

@Component({
  selector: 'app-command-factory',
  templateUrl: './command-factory.component.html',
  styleUrls: ['./command-factory.component.css']
})

export class CommandFactoryComponent implements OnInit {

  // temporary mock
  private command = {
    "commandType": "stroke",
    "start": {
      "x": 120.7,
      "y": 150
    }, 
    "end": {
      "x": 220.7,
      "y": 250
    }
  };

  constructor() {}

  ngOnInit() {
  }

  static createShape(name: string, args: Object): DrawComponent {
    switch(name) {
      case "stroke":
        return new StrokeComponent(<Point[]> args);
      default:
        throw new Error("Invalid shape " + name);
    }
  }

}
