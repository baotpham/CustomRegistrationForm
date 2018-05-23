import { Component, OnInit } from '@angular/core';
import { Attendee } from '../models/Attendee';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {

  sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // model = new Attendee('John','Ha', 'Medium', 'Male', 23, 'N/A');
  submitted = false;

  constructor() { }

  ngOnInit() {
  }

}
