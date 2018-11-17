import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map';

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
  private canvas: CanvasRenderingContext2D;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    let cvs = <HTMLCanvasElement>document.getElementById("mainCanvas");
    this.canvas = cvs.getContext("2d");
    this.requestCommand();
  }

  requestCommand(): void {
    const endpoint: string = "http://127.0.0.1:5000/api/150";
    // var temp = this.http.get(endpoint).subscribe(res => {
    //   console.log(res);
    //   command = res.stringify();
    // });
    this.parseJSON();
  }

  parseJSON() {
    // todo: create Stroke class and Fill class.
    if (this.command.commandType === "stroke") {
      // call draw in stroke class
      this.canvas.beginPath();
      this.canvas.moveTo(this.command.start.x, this.command.start.y);
      this.canvas.lineTo(this.command.end.x, this.command.end.y);
      this.canvas.stroke();
    } else if (this.command.commandType === "fill") {
      // call draw in fill class
    }
  }

}
