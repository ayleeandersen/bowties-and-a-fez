import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draw-command',
  templateUrl: './draw-command.component.html',
  styleUrls: ['./draw-command.component.css']
})
export abstract class DrawCommandComponent implements OnInit {
  canvas: CanvasRenderingContext2D;
  command: any;

  constructor(canvas: CanvasRenderingContext2D, command: any) { 
    this.canvas = canvas;
    this.command = command;
  }

  ngOnInit() {

  }

  abstract execute();

}
