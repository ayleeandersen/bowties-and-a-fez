import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx'; 
import { InvokerComponent } from '../invoker/invoker.component';
import { Point } from '../draw/draw.component';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  private static CANVAS_WIDTH = 1000;
  private static CANVAS_HEIGHT = 800;

  private connection: Subject<any>;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mouseDown: boolean;
  private points: Array<Point>;

  constructor(private wsService : WebsocketService) {
  }

  ngOnInit() {
    this.connection = <Subject<any>> this.wsService
      .connect(this.respondToMessage)
      .map((response: any): any => {
        return response;
      });
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");
    InvokerComponent.Instance.Context = this.ctx;

    document.addEventListener("mousemove", this.mouseMoveHandler, false);
    document.addEventListener("mousedown", this.mouseDownHandler, false);
    document.addEventListener("mouseup", this.mouseUpHandler, false);
  }

  private respondToMessage(data) : void {
    console.log("Got " + data);
  }

  private sendMessage(msg) : void {
    console.log("Sending " + msg)
    // this.connection.next(msg);
  }

  private mouseMoveHandler(event) {
    if (!this.mouseDown) {
      return;
    }
    var relativeX = event.clientX - this.canvas.offsetLeft;
    var relativeY = event.clientY - this.canvas.offsetTop;

    if (relativeX > 0 && relativeX < CanvasComponent.CANVAS_WIDTH && relativeY > 0 && relativeY < CanvasComponent.CANVAS_HEIGHT) {
      this.points.push(new Point(relativeX, relativeY));
    }
  }

  private mouseDownHandler(event) {
    this.points = [];
    this.mouseDown = true;
  }

  private mouseUpHandler(event) {
    this.mouseDown = false;
    InvokerComponent.Instance.drawShape("stroke", this.points);
  }

}
