import { Component, OnInit } from '@angular/core';
import { Attendee } from '../models/Attendee';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {

  models = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  genders = ['Male', 'Female']
  //model = new Attendee('John','Ha', this.sizes[1], 'Male', 23, 'N/A');
  model = new Attendee("","","","",0,"");
  
  submitted = false;
  onSubmit() { this.submitted = true; }

  // Makes sure form is binding with model correctly when "{{diagnostic}}" is placed in form.
  // get diagnostic() { return JSON.stringify(this.model); }

  addAttendee(){
    this.models.push(this.model);
  }

  constructor() { }

  ngOnInit() {
  }

}
