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

  index = 0;
  people = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  genders = ['Male', 'Female']
  //model = new Attendee('John','Ha', this.sizes[1], 'Male', 23, 'N/A');
  model = new Attendee("", "", "", "", 0, "");

  // Makes sure form is binding with model correctly when "{{diagnostic}}" is placed in form.
  // get diagnostic() { return JSON.stringify(this.model); }

  addAttendee() {
    if (this.attendeeForm.valid) {
      console.log(this.first_name.value);
      console.log(this.last_name.value);
      console.log(this.t_shirt.value);
      console.log(this.gender.value);
      console.log(this.age.value);
      console.log(this.medical.value);
      this.bindToModel();
      this.people.push(new Attendee(this.first_name.value, this.last_name.value,this.t_shirt.value,
        this.gender.value,this.age.value,this.medical.value));
      console.log("Adding new attendee.");
      this.attendeeForm.reset();
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


  bindToModel(){
    this.model.first_name = this.first_name.value;
    this.model.last_name = this.last_name.value;
    this.model.t_shirt = this.t_shirt.value;
    this.model.gender = this.gender.value;
    this.model.age = this.age.value;
    this.model.medical = this.medical.value;
  }

  bindFromModel(){
    this.first_name.setValue(this.model.first_name);
    this.last_name.setValue(this.model.last_name);
    this.t_shirt.setValue(this.model.t_shirt);
    this.gender.setValue(this.model.gender);
    this.age.setValue(this.model.age);
    this.medical.setValue(this.model.medical);
  }
  
  onSubmit() {
    console.log("model-based form submitted");
    console.log(this.attendeeForm);
  }

  fullUpdate() {
    this.attendeeForm.setValue({ first_name: 'Partial', last_name: 'monkey', t_shirt: 'M', gender: 'Male', 
      age: 12, medical: 'yes' });
  }
  lazyOne() {
    this.attendeeForm.setValue({ first_name: '1', last_name: '1', t_shirt: 'S', gender: 'Male', 
      age: 1, medical: '1' });
  }
  lazyTwo() {
    this.attendeeForm.setValue({ first_name: '2', last_name: '2', t_shirt: 'M', gender: 'Female', 
      age: 2, medical: '2' });
  }

  partialUpdate() {
    this.attendeeForm.patchValue({ age: this.index});
    console.log("hi");
  }
  reset() {
    this.attendeeForm.reset();
  }
  loadAttendee(attendee: Attendee){
    this.bind(attendee);

    if(this.onPropertyChanged()){

    }

    // console.log("Updating index from " + this.index + " to " + new_index);
    // this.index = new_index;
    // console.log("Updated index to: " + this.index);

    // this.model=this.forms[new_index];
    // console.log("Model is: " + this.model);
    // console.log("Updating form to this model.");


    // this.attendeeForm.setValue({ first_name: this.model.first_name, last_name: this.model.last_name, t_shirt: this.model.t_shirt, 
    //   gender: this.model.gender, age: this.model.age, medical: this.model.medical});
    this.bindFromModel();
  }

  check(){
    for (let entry of this.people){
      console.log(entry);
    }
    console.log(this.people.toString);
    console.log(this.people.length);
  }
  onPropertyChanged(){

    return true;
  }

  bind(attendee: Attendee){
    this.model.first_name = attendee.first_name;
    this.model.last_name = attendee.last_name;
    this.model.t_shirt = attendee.t_shirt;
    this.model.gender = attendee.gender;
    this.model.age = attendee.age;
    this.model.medical = attendee.medical;
  }

}
