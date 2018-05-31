import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AttendeeFormComponent } from './attendee-form/attendee-form.component';
import { InfoFormComponent } from './info-form/info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AttendeeFormComponent,
    InfoFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
