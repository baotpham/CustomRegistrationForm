import { Component, OnInit, Input } from '@angular/core';
import { Attendee } from '../Models/Attendee';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from '../services/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    // 'Authorization': 'my-auth-token'
  })
};

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

  //emergency info
  emergency_contact_first_name        = new FormControl("", Validators.required);
  emergency_contact_last_name         = new FormControl("", Validators.required);
  emergency_contact_phone_number      = new FormControl("", Validators.required);
  emergency_contact_relationship      = new FormControl("", Validators.required);

  //church info
  your_church                         = new FormControl("", Validators.required);
  your_church_point_of_contact_name   = new FormControl("", Validators.required);
  your_church_point_of_contact_number = new FormControl("", Validators.required);


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

  model = new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", "", "", "", "");

  currentAttendee: Attendee;

  shouldSlice: boolean = true;

  constructor(fb: FormBuilder, private http: HttpClient, private userService: UserService) {
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

      //emergency info
      "emergency_contact_first_name"        : this.emergency_contact_first_name,
      "emergency_contact_last_name"         : this.emergency_contact_last_name,
      "emergency_contact_phone_number"      : this.emergency_contact_phone_number,
      "emergency_contact_relationship"      : this.emergency_contact_relationship,

      "your_church"                         : this.your_church,
      "your_church_point_of_contact_name"   : this.your_church_point_of_contact_name,
      "your_church_point_of_contact_number" : this.your_church_point_of_contact_number,
    });
  }

  ngOnInit() {
    this.loadAttendees();
  }


  //CRUD Options
  //Add attendee by creating a new attendee and navigating to it.
  //Previous form must be valid before moving on.
  //Must show active on new form.
  addAttendee() {
    console.log("is form valid? ", this.attendeeForm.valid);

    if (this.attendeeForm.valid) {
      var attendee = new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", "", "", "", "");

      attendee.first_name                           = this.first_name.value;
      attendee.last_name                            = this.last_name.value;
      attendee.t_shirt                              = this.t_shirt.value;
      attendee.gender                               = this.gender.value;
      attendee.age                                  = this.age.value;
      attendee.medical                              = this.medical.value;
      attendee.address                              = this.address.value;
      attendee.address_2                            = this.address_2.value;
      attendee.city                                 = this.city.value;
      attendee.state                                = this.state.value;
      attendee.zip_code                             = this.zip_code.value;
      attendee.email                                = this.email.value;
      attendee.emergency_contact_first_name         = this.emergency_contact_first_name.value;
      attendee.emergency_contact_last_name          = this.emergency_contact_last_name.value;
      attendee.emergency_contact_phone_number       = this.emergency_contact_phone_number.value;
      attendee.emergency_contact_relationship       = this.emergency_contact_relationship.value;
      attendee.your_church                          = this.your_church.value;
      attendee.your_church_point_of_contact_name    = this.your_church_point_of_contact_name.value;
      attendee.your_church_point_of_contact_number  = this.your_church_point_of_contact_number.value;


      console.log("attendee", attendee);
      this.userService.addAttendee(this.current_index, attendee);

      this.currentAttendee = attendee;

      if(this.shouldSlice) this.people.splice(this.max_index, 1);

      this.people[this.current_index] = attendee;

      console.log("people", this.people);
    }
  }


  createNewAttendee(){
    if (this.attendeeForm.valid) {
      this.people.push(new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", "", "", "", ""));
      console.log(this.people);

      this.max_index++;
      this.current_index = this.max_index;

      //copy church info to every other register. save work for leaders
      this.people[this.max_index].your_church = this.your_church.value;
      this.people[this.max_index].your_church_point_of_contact_name = this.your_church_point_of_contact_name.value;
      this.people[this.max_index].your_church_point_of_contact_number = this.your_church_point_of_contact_number.value;

      //update current attendee
      this.currentAttendee = this.people[this.max_index];

      //make sure the last index should be deleted since we just added an empty object into people
      this.shouldSlice = true;

      //bind to UI
      this.bindListToForm();
    }
  }


  loadAttendees(){
    var attendees = this.userService.getAllRegisters();

    if(attendees.length > 0){
      this.people = attendees;

      this.max_index = this.people.length - 1;
      this.current_index = this.max_index;

      this.currentAttendee = this.people[this.current_index];

      this.attendeeForm.reset();

      //make sure the last index should not be deleted
      this.shouldSlice = false;

      this.bindListToForm();
      console.log("yes people", this.people);
    }else{
      this.people.push(new Attendee("", "", "", "", null, "", "", "" , "", "" , "" ,"", "", "", "", "", "", "", ""));
      this.currentAttendee = this.people[0];
      this.max_index = 0;
      this.current_index = 0;
      console.log("no people");
    }
  }


  // Must navigate to specific attendee and update active pagination
  loadAttendee(attendee: Attendee, new_index: number) {

    console.log("saving old attendee data before moving on");
    //Save current attendee before moving on
    // this.bindFormToList(this.current_index);

    //Sets new current attendee for active setting
    this.currentAttendee = attendee;

    console.log("pulls in target attendee data into form");
    //Pull in target attendee data and put into form
    this.bindListToForm();

    //Updates current index to the attendee we're loading
    this.current_index = new_index;

    //make sure the last index should not be deleted
    this.shouldSlice = false;
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
      this.bindListToForm();

    }
    else{
      console.log("Cannot delete first index.");
    }
  }






  //Binding
  //Updates the list's values with the contents of the form
  bindFormToList(index: number) {
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
  bindListToForm() {
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
    this.your_church.setValue(this.currentAttendee.your_church);
    this.your_church_point_of_contact_name.setValue(this.currentAttendee.your_church_point_of_contact_name);
    this.your_church_point_of_contact_number.setValue(this.currentAttendee.your_church_point_of_contact_number);
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

  //Helper buttons
  fullUpdate() {
    this.attendeeForm.setValue({
      first_name: 'Partial', last_name: 'monkey', t_shirt: 'M', gender: 'Male',
      age: 12, medical: 'yes', address: '123 Adams Ave', address_2: "N/A", city: "Phila",
      state: "PA", zip_code: "12312312", email: "test@test.com", emergency_contact_first_name: "Test",
      emergency_contact_last_name: "Testest", emergency_contact_phone_number: "12312312", emergency_contact_relationship: "asdfasd",
      your_church: "Bapist", your_church_point_of_contact_name: "asdafsdfasdfa", your_church_point_of_contact_number: "1231231232"
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
}
