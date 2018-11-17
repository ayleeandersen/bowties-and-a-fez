import { Component, OnInit } from '@angular/core';
import { CommandFactoryComponent } from '../command-factory/command-factory.component';

@Component({
  selector: 'app-invoker',
  templateUrl: './invoker.component.html',
  styleUrls: ['./invoker.component.css']
})
export class InvokerComponent implements OnInit {

  private static _instance: InvokerComponent;

  private ctx: CanvasRenderingContext2D;

  private constructor() { }

  ngOnInit() {
  }

  public drawShape(shapeName: string, args: Object) {
    let shape = CommandFactoryComponent.createShape(shapeName, args);
    shape.execute(this.ctx);
  }

  public set Context(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

}
