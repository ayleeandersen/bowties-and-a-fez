import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export abstract class DrawComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  abstract execute(ctx : CanvasRenderingContext2D): void;

}

export class Point {

  x : number;
  y : number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

}