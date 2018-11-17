import { Component, OnInit } from '@angular/core';
import { Point, DrawComponent } from '../draw.component';

@Component({
  selector: 'app-stroke',
  templateUrl: './stroke.component.html',
  styleUrls: ['./stroke.component.css']
})
export class StrokeComponent implements OnInit, DrawComponent {

  constructor(private points: Array<Point>) { }

  ngOnInit() {
  }

  execute(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    if (this.points.length > 0) {
      ctx.moveTo(this.points[0].x, this.points[0].y)
    }
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.stroke();
  }

}
