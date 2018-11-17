import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket;

  constructor() { }

  connect(onReceive): Rx.Subject<MessageEvent> {
    this.socket = io(environment.ws_url);

    let observable = new Observable(observer => {
        this.socket.on('message', onReceive)
        return () => {
          this.socket.disconnect();
        }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    }

    return Rx.Subject.create(observer, observable);
  }
}
