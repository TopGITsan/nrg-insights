import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent, AppScam } from './app.sfc';


@NgModule({
  imports: [BrowserModule, AppScam],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
