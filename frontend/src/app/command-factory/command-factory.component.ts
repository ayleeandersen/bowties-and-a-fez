import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-command-factory',
  templateUrl: './command-factory.component.html',
  styleUrls: ['./command-factory.component.css']
})
export class CommandFactoryComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.requestCommand();
  }

  requestCommand(): void {
    const endpoint: string = "127:0.0.1:8000/api/150";
    // var temp = this.http.get(endpoint);
  }

}
