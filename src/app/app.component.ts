import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // title = 'CVCF Youth Retreat 2018 Registration Form';
  title = 'Practice Form';
  page = 'attendeesFormPage';

  constructor(){

  }

  switchPage(page){
    this.page = page;
  }
  onCompleted(completed: string){
    completed ? this.page = completed : this.page = "attendeesFormPage";
  }
}
