import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommandFactoryComponent } from './command-factory/command-factory.component';
import { StrokeComponent } from './stroke/stroke.component';
import { CanvasComponent } from './canvas/canvas.component';
import { DrawCommandComponent } from './draw-command/draw-command.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandFactoryComponent,
    StrokeComponent,
    CanvasComponent,
    DrawCommandComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
