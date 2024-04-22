import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxSchedulePlannerModule } from 'ngx-schedule-planner';

enableProdMode();
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSchedulePlannerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
