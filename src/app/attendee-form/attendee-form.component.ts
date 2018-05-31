import { Component, OnInit } from '@angular/core';
import { Attendee } from '../Models/Attendee';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {
  attendeeForm: FormGroup;

  first_name = new FormControl("", Validators.required);
  last_name = new FormControl("", Validators.required);
  t_shirt = new FormControl("", Validators.required);
  gender = new FormControl("", Validators.required);
  age = new FormControl("", Validators.required);
  medical = new FormControl("", Validators.required);

  forms = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  genders = ['Male', 'Female']
  //model = new Attendee('John','Ha', this.sizes[1], 'Male', 23, 'N/A');
  model = new Attendee("", "", "", "", 0, "");

  submitted = false;

  // Makes sure form is binding with model correctly when "{{diagnostic}}" is placed in form.
  // get diagnostic() { return JSON.stringify(this.model); }

  addAttendee() {
    if (this.attendeeForm.valid) {
      this.forms.push(this.model);
      console.log("Adding new attendee.");
      this.attendeeForm.reset();
      this.model = new Attendee("", "", "", "", 0, "");
    }
  }

  constructor(fb: FormBuilder) {
    this.attendeeForm = fb.group({
      "first_name": this.first_name,
      "last_name": this.last_name,
      "t_shirt": this.t_shirt,
      "gender": this.gender,
      "age": this.age,
      "medical": this.medical
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.attendeeForm);
  }

  fullUpdate() {
    this.attendeeForm.setValue({ first_name: 'Partial', last_name: 'monkey', t_shirt: 'M', gender: 'Male', 
      age: 12, medical: 'yes' });
  }

  partialUpdate() {
    this.attendeeForm.patchValue({ age: this.forms.length });
  }
  reset() {
    this.attendeeForm.reset();
  }

}
