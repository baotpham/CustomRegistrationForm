import { Component, OnInit, Input } from '@angular/core';
import { Attendee } from '../Models/Attendee';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder, FormsModule } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})
export class AttendeeFormComponent implements OnInit {
  attendeeForm: FormGroup;

  first_name  = new FormControl("", Validators.required);
  last_name   = new FormControl("", Validators.required);
  t_shirt     = new FormControl("", Validators.required);
  gender      = new FormControl("", Validators.required);
  age         = new FormControl("", Validators.required);
  medical     = new FormControl("", Validators.required);
  address     = new FormControl("", Validators.required);
  address_2   = new FormControl("", Validators.required);
  city        = new FormControl("", Validators.required);
  state       = new FormControl("", Validators.required);
  zip_code    = new FormControl("", Validators.required);
  email       = new FormControl("", Validators.required);

  //church info
  your_church                         = new FormControl("", Validators.required);
  your_church_point_of_contact_name   = new FormControl("", Validators.required);
  your_church_point_of_contact_number = new FormControl("", Validators.required);

  //emergency info
  emergency_contact_first_name        = new FormControl("", Validators.required);
  emergency_contact_last_name         = new FormControl("", Validators.required);
  emergency_contact_phone_number      = new FormControl("", Validators.required);
  emergency_contact_relationship      = new FormControl("", Validators.required);

  //payment info
  card_number                         = new FormControl("", Validators.required);
  name_on_card                        = new FormControl("", Validators.required);
  expiration_date                     = new FormControl("", Validators.required);
  security_code                       = new FormControl("", Validators.required);

  max_index = 0;
  current_index = 0;
  people = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  genders = ['Male', 'Female'];
  states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI",
            "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI",
            "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
            "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
            "VA", "VT", "WA", "WI", "WV", "WY"];

  //model = new Attendee('John','Ha', this.sizes[1], 'Male', 23, 'N/A', 'address', 'address_2', 'city', 'state', zip_code, email);
  model = new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", "");



  fee: number;
  isPaid: boolean;

  currentAttendee: Attendee;

  // Makes sure form is binding with model correctly when "{{diagnostic}}" is placed in form.
  // get diagnostic() { return JSON.stringify(this.model); }

  constructor(fb: FormBuilder, private http: HttpClient) {
    this.attendeeForm = fb.group({
      "first_name"  : this.first_name,
      "last_name"   : this.last_name,
      "t_shirt"     : this.t_shirt,
      "gender"      : this.gender,
      "age"         : this.age,
      "medical"     : this.medical,
      "address"     : this.address,
      "address_2"   : this.address_2,
      "city"        : this.city,
      "state"       : this.state,
      "zip_code"    : this.zip_code,
      "email"       : this.email,
      // "your_church"                         : this.your_church,
      // "your_church_point_of_contact_name"   : this.your_church_point_of_contact_name,
      // "your_church_point_of_contact_number" : this.your_church_point_of_contact_number,

      //emergency info
      "emergency_contact_first_name"        : this.emergency_contact_first_name,
      "emergency_contact_last_name"         : this.emergency_contact_last_name,
      "emergency_contact_phone_number"      : this.emergency_contact_phone_number,
      "emergency_contact_relationship"      : this.emergency_contact_relationship,

      //payment info
      // "card_number"                         : this.card_number,
      // "name_on_card"                        : this.name_on_card,
      // "expiration_date"                     : this.expiration_date,
      // "security_code"                       : this.security_code
    });
  }

  ngOnInit() {
    this.max_index = 0;
    this.current_index = 0;
    this.people.push(new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", ""));
    console.log("PEOPLE", this.people);
    // this.currentAttendee = this.people[this.current_index];
    // this.loadAttendee(this.people[this.current_index], this.current_index);
  }

  onSubmit() {
    console.log("model-based form submitted");
    // console.log("attendees", this.attendeeForm);
    // console.log("other info", this.attendeeOtherInfoForm);

    if(this.attendeeForm.valid){

      //add the last person to the list
      this.bindFormToList(this.current_index);
      
      this.people.forEach((attendee) => {
        console.log("attendee", attendee);
        this.http.post(
          "https://docs.google.com/forms/d/e/1FAIpQLSdpCxARcwWV5BeH5kjj45vVzJgrdOca4e78vq2KHPB2epx8yw/formResponse",
          {
            "entry.736264477": attendee.first_name,
            "entry.1216232379": attendee.last_name,
            "entry.1922331484": attendee.t_shirt,
            "entry.1808161308": attendee.gender,
            "entry.982307170": attendee.age,
            "entry.237564014": attendee.medical,
            "entry.475860172": attendee.address,
            "entry.1132819387": attendee.address_2,
            "entry.882873948": attendee.city,
            "entry.1300146252": attendee.state,
            "entry.1995735036": attendee.zip_code,
            "entry.1163380930": attendee.email,

            "entry.1814348022": this.your_church,
            "entry.1795731922": this.your_church_point_of_contact_name,
            "entry.42598533": this.your_church_point_of_contact_number,

            //emergency info
            "entry.1822987082": this.emergency_contact_first_name,
            "entry.854313620": this.emergency_contact_last_name,
            "entry.1752027412": this.emergency_contact_phone_number,
            "entry.516070659": this.emergency_contact_relationship,

            //payment info
            "entry.345154263": "",
            "entry.1114223182": ""
          }
        );
      });
    }else{
      alert("Please fill out every field");
    }
  }


  //Helper buttons
  fullUpdate() {
    this.attendeeForm.setValue({
      first_name: 'Partial', last_name: 'monkey', t_shirt: 'M', gender: 'Male',
      age: 12, medical: 'yes', address: '123 Adams Ave', address_2: "N/A", city: "Phila",
      state: "PA", zip_code: "12312312", email: "test@test.com", emergency_contact_first_name: "Test",
      emergency_contact_last_name: "Testest", emergency_contact_phone_number: "12312312", emergency_contact_relationship: "asdfasd"
    });
  }
  lazyOne() {
    this.attendeeForm.setValue({
      first_name: '1', last_name: '1', t_shirt: 'S', gender: 'Male',
      age: 1, medical: '1', address: '123 Adams Ave', address_2: "N/A", city: "Phila",
      state: "PA", zip_code: "12312312", email: "test@test.com"
    });
  }
  lazyTwo() {
    this.attendeeForm.setValue({
      first_name: '2', last_name: '2', t_shirt: 'M', gender: 'Female',
      age: 2, medical: '2', address: '123 Adams Ave', address_2: "N/A", city: "Phila",
      state: "PA", zip_code: "12312312", email: "test@test.com"
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
      this.people.push(new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", ""));
      this.attendeeForm.reset();
      console.log("Adding new attendee.");

      //Update variables to look at new Attendee
      this.max_index++;
      this.current_index = this.max_index;
      this.currentAttendee = this.people[this.max_index];
      //this.loadAttendee(this.people[this.max_index], this.max_index);
    }
  }

  //Must navigate to specific attendee and update active pagination
  loadAttendee(attendee: Attendee, new_index: number) {

    console.log("saving old attendee data before moving on");
    //Save current attendee before moving on
    this.bindFormToList(this.current_index);

    //Sets new current attendee for active setting
    this.currentAttendee = attendee;

    console.log("pulls in target attendee data into form");
    //Pull in target attendee data and put into form
    this.bindListToForm(new_index);

    //Updates current index to the attendee we're loading
    this.current_index = new_index;
  }

  //Deletes attendee from current list
  deleteAttendee(index) {
    console.log("current index is: " + index);
    if (index >= 0) {

      //Deletes Attendee from list
      this.people.splice(index, 1);
      this.max_index--;

      //Resets current attendee and index to the first one
      this.current_index = index - 1;
      this.currentAttendee = this.people[this.current_index];
      this.bindListToForm(this.current_index);

    }
    else{
      console.log("Cannot delete first index.");
    }
  }


  //Binding
  //Updates the list's values with the contents of the form
  bindFormToList(index: number) {
    console.log(this.people[index]);
    console.log(this.first_name.value);
    console.log(this.last_name.value);
    console.log(this.t_shirt.value);
    console.log(this.gender.value);

    this.people[index].first_name   = this.first_name.value;
    this.people[index].last_name    = this.last_name.value;
    this.people[index].t_shirt      = this.t_shirt.value;
    this.people[index].gender       = this.gender.value;
    this.people[index].age          = this.age.value;
    this.people[index].medical      = this.medical.value;
    this.people[index].address      = this.address.value;
    this.people[index].address_2    = this.address_2.value;
    this.people[index].city         = this.city.value;
    this.people[index].state        = this.state.value;
    this.people[index].zip_code     = this.zip_code.value;
    this.people[index].email        = this.email.value;
    this.people[index].emergency_contact_first_name        = this.emergency_contact_first_name.value;
    this.people[index].emergency_contact_last_name         = this.emergency_contact_last_name.value;
    this.people[index].emergency_contact_phone_number      = this.emergency_contact_phone_number.value;
    this.people[index].emergency_contact_relationship      = this.emergency_contact_relationship.value;
  }

  //Updates the form's values with the contents from the list
  bindListToForm(index: number) {
    this.first_name.setValue(this.currentAttendee.first_name);
    this.last_name.setValue(this.currentAttendee.last_name);
    this.t_shirt.setValue(this.currentAttendee.t_shirt);
    this.gender.setValue(this.currentAttendee.gender);
    this.age.setValue(this.currentAttendee.age);
    this.medical.setValue(this.currentAttendee.medical);
    this.address.setValue(this.currentAttendee.address);
    this.address_2.setValue(this.currentAttendee.address_2);
    this.city.setValue(this.currentAttendee.city);
    this.state.setValue(this.currentAttendee.state);
    this.zip_code.setValue(this.currentAttendee.zip_code);
    this.email.setValue(this.currentAttendee.email);
    this.emergency_contact_first_name.setValue(this.currentAttendee.emergency_contact_first_name);
    this.emergency_contact_last_name.setValue(this.currentAttendee.emergency_contact_last_name);
    this.emergency_contact_phone_number.setValue(this.currentAttendee.emergency_contact_phone_number);
    this.emergency_contact_relationship.setValue(this.currentAttendee.emergency_contact_relationship);
  }

  //updates malleable model to target attendee info
  bindToTarget(attendee: Attendee) {
    this.model.first_name   = attendee.first_name;
    this.model.last_name    = attendee.last_name;
    this.model.t_shirt      = attendee.t_shirt;
    this.model.gender       = attendee.gender;
    this.model.age          = attendee.age;
    this.model.medical      = attendee.medical;
    this.model.address      = attendee.address;
    this.model.address_2    = attendee.address_2;
    this.model.city         = attendee.city;
    this.model.state        = attendee.state;
    this.model.zip_code     = attendee.zip_code;
    this.model.email        = attendee.email;
    this.model.emergency_contact_first_name        = attendee.emergency_contact_first_name;
    this.model.emergency_contact_last_name        = attendee.emergency_contact_last_name;
    this.model.emergency_contact_phone_number        = attendee.emergency_contact_phone_number;
    this.model.emergency_contact_relationship        = attendee.emergency_contact_relationship;
  }
}
