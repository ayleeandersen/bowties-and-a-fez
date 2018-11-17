import { Component, OnInit } from '@angular/core';
import { DrawCommandComponent } from '../draw-command/draw-command.component';

@Component({
  selector: 'app-stroke',
  templateUrl: './stroke.component.html',
  styleUrls: ['./stroke.component.css']
})
export class StrokeComponent extends DrawCommandComponent implements OnInit {

  constructor(canvas: CanvasRenderingContext2D,
    command: any
  ) { 
    super(canvas, command);
  }

  ngOnInit() {
  }

  execute() {
    this.canvas.beginPath();
    this.canvas.moveTo(this.command.start.x, this.command.start.y);
    this.canvas.lineTo(this.command.end.x, this.command.end.y);
    this.canvas.stroke();
  }
}
