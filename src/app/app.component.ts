import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'CVCF Youth Retreat 2018 Registration Form';
  page = 'attendeesFormPage';

  constructor(){

  }

  nextPage(){
    this.page = this.page == 'attendeesFormPage' ? 'reviewPage' : 'attendeesFormPage';
  }
}
