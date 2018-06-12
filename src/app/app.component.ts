import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  titleOne = 'CVCF Youth Retreat 2018';
  titleTwo = 'Registration Form';
  page = 'attendeesFormPage';

  constructor(){

  }

  switchPage(page){
    this.page = page;
  }
}
