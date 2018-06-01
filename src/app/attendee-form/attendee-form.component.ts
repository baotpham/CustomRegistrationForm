import { Component, OnInit, Input } from '@angular/core';
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

  max_index = 0;
  current_index = 0;
  people = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  genders = ['Male', 'Female']
  //model = new Attendee('John','Ha', this.sizes[1], 'Male', 23, 'N/A');
  model = new Attendee("", "", "", "", 0, "");
  currentAttendee: Attendee;

  // Makes sure form is binding with model correctly when "{{diagnostic}}" is placed in form.
  // get diagnostic() { return JSON.stringify(this.model); }

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
    this.max_index = 0;
    this.current_index = 0;
    this.people.push(new Attendee("", "", "", "", null, ""));
    this.currentAttendee = this.people[this.current_index];
    //this.loadAttendee(this.people[this.current_index], this.current_index);
  }

  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.attendeeForm);
  }


  //Helper buttons
  fullUpdate() {
    this.attendeeForm.setValue({
      first_name: 'Partial', last_name: 'monkey', t_shirt: 'M', gender: 'Male',
      age: 12, medical: 'yes'
    });
  }
  lazyOne() {
    this.attendeeForm.setValue({
      first_name: '1', last_name: '1', t_shirt: 'S', gender: 'Male',
      age: 1, medical: '1'
    });
  }
  lazyTwo() {
    this.attendeeForm.setValue({
      first_name: '2', last_name: '2', t_shirt: 'M', gender: 'Female',
      age: 2, medical: '2'
    });
  }

  partialUpdate() {
    this.attendeeForm.patchValue({ age: this.max_index });
    console.log("hi");
  }

  check() {
    for (let entry of this.people) {
      console.log(entry);
    }
    console.log(this.people.toString);
    console.log(this.people.length);
  }


  //CRUD Options
  //Add attendee by creating a new attendee and navigating to it.
  //Previous form must be valid before moving on.
  //Must show active on new form.
  addAttendee() {
    if (this.attendeeForm.valid) {
      
      //Save previous form info
      this.bindFormToList(this.current_index);

      //Once information is saved, then clears the page
      this.people.push(new Attendee("", "", "", "", null, ""));
      this.attendeeForm.reset();
      console.log("Adding new attendee.");

      //Update variables to look at new Attendee
      this.max_index++;
      this.current_index = this.max_index;
      this.currentAttendee = this.people[this.max_index];
      this.loadAttendee(this.people[this.max_index], this.max_index);
    }
  }

  //Must navigate to specific attendee and update active pagination
  loadAttendee(attendee: Attendee, new_index: number) {

    //Save current attendee before moving on
    this.bindFormToList(this.current_index);

    //Sets new current attendee for active setting
    this.currentAttendee = attendee;

    //Pull in target attendee data and put into form
    this.bindListToForm(new_index); 

    //Updates current index to the attendee we're loading
    this.current_index = new_index;
  }

  //Deletes attendee from current list
  deleteAttendee() {
    console.log("current index is: " + this.current_index);
    if (this.current_index >= 0) {
      this.people.splice(this.current_index, 1);
    }
  }

  //Binding
  //Updates the list's values with the contents of the form
  bindFormToList(index: number) {
    // console.log(this.first_name.value);
    // console.log(this.people[index].first_name);
    // console.log(this.last_name.value);
    // console.log(this.people[index].last_name);
    // console.log(this.t_shirt.value);
    // console.log(this.people[index].t_shirt);
    // console.log(this.gender.value);
    // console.log(this.people[index].gender);
    this.people[index].first_name = this.first_name.value;
    this.people[index].last_name = this.last_name.value;
    this.people[index].t_shirt = this.t_shirt.value;
    this.people[index].gender = this.gender.value;
    this.people[index].age = this.age.value;
    this.people[index].medical = this.medical.value;
  }

  //Updates the form's values with the contents from the list
  bindListToForm(index: number) {
    this.first_name.setValue(this.people[index].first_name);
    this.last_name.setValue(this.people[index].last_name);
    this.t_shirt.setValue(this.people[index].t_shirt);
    this.gender.setValue(this.people[index].gender);
    this.age.setValue(this.people[index].age);
    this.medical.setValue(this.people[index].medical);
  }

  //updates malleable model to target attendee info
  bindToTarget(attendee: Attendee) {
    this.model.first_name = attendee.first_name;
    this.model.last_name = attendee.last_name;
    this.model.t_shirt = attendee.t_shirt;
    this.model.gender = attendee.gender;
    this.model.age = attendee.age;
    this.model.medical = attendee.medical;
  }

}
