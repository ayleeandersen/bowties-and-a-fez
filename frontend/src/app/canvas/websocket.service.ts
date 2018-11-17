import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket : WebSocket;

  constructor() { }

  connect(onReceive): Rx.Subject<MessageEvent> {
    this.socket = new WebSocket(environment.ws_url);

    let observable = new Observable(observer => {
        this.socket.onmessage = onReceive;
        return () => {
          this.socket.close();
        }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.send(JSON.stringify(data));
      }
    }

    return Rx.Subject.create(observer, observable);
  }
}
