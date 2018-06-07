import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AttendeeFormComponent } from './attendee-form/attendee-form.component';
import { InfoFormComponent } from './info-form/info-form.component';

import { HttpClientModule } from '@angular/common/http';
import { ReviewPageComponent } from './review-page/review-page.component';
import { TransferHttpCacheModule } from '@hapiness/ng-universal-transfer-http';

@NgModule({
  declarations: [
    AppComponent,
    AttendeeFormComponent,
    InfoFormComponent,
    ReviewPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'registration-form-id'}),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TransferHttpCacheModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
