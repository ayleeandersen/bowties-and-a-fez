import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx'; 

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  connection: Subject<any>;

  constructor(private wsService : WebsocketService) { }

  ngOnInit() {
    // let cvs = <HTMLCanvasElement>document.getElementById("mainCanvas");

    this.connection = <Subject<any>> this.wsService
      .connect(this.respondToMessage)
      .map((response: any): any => {
        return response;
      });
  }

  private respondToMessage(data) : void {
    console.log("Got" + data);
  }

  private sendMessage(msg) : void {
    this.connection.next(msg);
  }

}
