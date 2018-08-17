import { Component, OnInit, Input } from '@angular/core';
import { Attendee } from '../models/Attendee';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UserService } from '../services/user.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Component({
  selector: 'app-attendee-form',
  templateUrl: './attendee-form.component.html',
  styleUrls: ['./attendee-form.component.scss']
})

//Consider using AppSheet with Google Forms
//https://chrome.google.com/webstore/detail/appsheet/hmmicpkfdjjchdajlldfckjaanfobjob?hl=en-US

//But also
//https://www.qrstuff.com/

//Google API doe
//https://chart.googleapis.com/chart?cht=qr&chs=160x160&chl=HelloWorld&choe=UTF-8

export class AttendeeFormComponent implements OnInit {
  attendeeForm: FormGroup;

  first_name = new FormControl("", Validators.required);
  last_name = new FormControl("", Validators.required);
  t_shirt = new FormControl("", Validators.required);
  gender = new FormControl("", Validators.required);
  age = new FormControl("", Validators.required);
  medical = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  address_2 = new FormControl("");
  city = new FormControl("", Validators.required);
  state = new FormControl("", Validators.required);
  zip_code = new FormControl("", Validators.required);
  email = new FormControl("");

  //emergency info
  emergency_contact_first_name = new FormControl("", Validators.required);
  emergency_contact_last_name = new FormControl("", Validators.required);
  emergency_contact_phone_number = new FormControl("", Validators.required);
  emergency_contact_relationship = new FormControl("", Validators.required);

  //church info
  your_churches = new FormControl("", Validators.required);
  your_church = new FormControl("");
  your_church_point_of_contact_name = new FormControl("");
  your_church_point_of_contact_number = new FormControl("");

  max_index = 0;
  current_index = 0;
  cost = 0;
  days_attending = "";
  people = [];
  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  genders = ['Male', 'Female'];
  states = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "HI",
    "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI",
    "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV",
    "NY", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT",
    "VA", "VT", "WA", "WI", "WV", "WY"];
  church_list = ["Other", "MD - Lanham", "MD - Living Faith", "MD - Baltimore", "MD - Germantown",
    "PA - Philadelphia", "PA - Pittsburgh", "VA - Grace", "VA - Hyvong",
    "VA - Methodist Church", "FL - Orlando", "KY - Kentucky", "NC - North Carolina",
    "N/A"];

  days_chosen = [
    { name: 'Friday', selected: true, id: 1 },
    { name: 'Saturday', selected: true, id: 2 },
    { name: 'Sunday', selected: true, id: 3 },
    { name: 'Monday', selected: true, id: 4 }
  ];
  days_bool = [
    true, true, true, true
  ];

  model = new Attendee("", "", "", "", null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null);
  currentAttendee: Attendee;
  shouldSlice: boolean = true;

  constructor(private fb: FormBuilder, private http: HttpClient, private userService: UserService) {
    this.attendeeForm = fb.group({
      "first_name": this.first_name,
      "last_name": this.last_name,
      "t_shirt": this.t_shirt,
      "gender": this.gender,
      "age": this.age,
      "medical": this.medical,
      "address": this.address,
      "address_2": this.address_2,
      "city": this.city,
      "state": this.state,
      "zip_code": this.zip_code,
      "email": this.email,

      //emergency info
      "emergency_contact_first_name": this.emergency_contact_first_name,
      "emergency_contact_last_name": this.emergency_contact_last_name,
      "emergency_contact_phone_number": this.emergency_contact_phone_number,
      "emergency_contact_relationship": this.emergency_contact_relationship,

      //church info
      "your_churches": this.your_churches,
      "your_church": this.your_church,
      "your_church_point_of_contact_name": this.your_church_point_of_contact_name,
      "your_church_point_of_contact_number": this.your_church_point_of_contact_number,

      days: this.fb.array(this.days_bool),
    });
  }

  ngOnInit() {
    this.loadAttendees();
    this.checkChurch();
  }

  //CRUD Options
  //Add attendee by creating a new attendee and navigating to it.
  //Previous form must be valid before moving on.
  //Must show active on new form.
  addAttendee() {
    console.log("is form valid? ", this.attendeeForm.valid);

    this.checkChurch();
    if (this.attendeeForm.valid) {
      var attendee = new Attendee("", "", "", "", null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null);

      attendee.first_name = this.first_name.value;
      attendee.last_name = this.last_name.value;
      attendee.t_shirt = this.t_shirt.value;
      attendee.gender = this.gender.value;
      attendee.age = this.age.value;
      attendee.medical = this.medical.value;
      attendee.address = this.address.value;
      attendee.address_2 = this.address_2.value;
      attendee.city = this.city.value;
      attendee.state = this.state.value;
      attendee.zip_code = this.zip_code.value;
      attendee.email = this.email.value;
      attendee.emergency_contact_first_name = this.emergency_contact_first_name.value;
      attendee.emergency_contact_last_name = this.emergency_contact_last_name.value;
      attendee.emergency_contact_phone_number = this.emergency_contact_phone_number.value;
      attendee.emergency_contact_relationship = this.emergency_contact_relationship.value;
      attendee.your_church = this.your_church.value;
      attendee.your_church_point_of_contact_name = this.your_church_point_of_contact_name.value;
      attendee.your_church_point_of_contact_number = this.your_church_point_of_contact_number.value;
      this.numDaysCheck(); //updates days attending and cost before pushing change
      attendee.days_attending = this.days_attending;
      attendee.cost = this.cost;

      this.userService.addAttendee(this.current_index, attendee);

      this.currentAttendee = attendee;

      if (this.shouldSlice) this.people.splice(this.max_index, 1);

      this.people[this.current_index] = attendee;
    }
  }


  createNewAttendee() {
    if (this.attendeeForm.valid) {
      this.people.push(new Attendee("", "", "", "", null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Friday, Saturday, Sunday, Monday", null));
      console.log(this.people);

      this.max_index++;
      this.current_index = this.max_index;

      //Fills in checkboxes to attend everyday
      this.attendeeForm.setControl('days', this.fb.array(this.days_bool));

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
      this.your_churches.setValue("Other");

      //scroll to top of page
      this.scroll();
    }
  }


  loadAttendees() {
    var attendees = this.userService.getAllRegisters();
    console.log(attendees);

    if (attendees.length > 0) {
      this.people = attendees;

      this.max_index = this.people.length - 1;
      this.current_index = this.max_index;

      this.currentAttendee = this.people[this.current_index];

      this.attendeeForm.reset();

      //make sure the last index should not be deleted
      this.shouldSlice = false;

      this.bindListToForm();

      console.log("yes people", this.people);
    } else {
      this.people.push(new Attendee("", "", "", "", null, "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", null));
      this.currentAttendee = this.people[0];
      this.max_index = 0;
      this.current_index = 0;
      console.log("no people");
    }
  }


  // Must navigate to specific attendee and update active pagination
  loadAttendee(attendee: Attendee, new_index: number) {

    //Sets new current attendee for active setting
    this.currentAttendee = attendee;

    //Pull in target attendee data and put into form
    this.bindListToForm();

    this.rebindDaysCheck()

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
    else {
      console.log("Cannot delete first index.");
    }
  }

  //Checks if Other or N/A church is selected
  checkChurch() {
    if (this.your_churches.value == 'N/A') {
      this.your_church.setValue("");
    }
    else if (!(this.your_churches.value == 'Other')) {
      this.your_church.setValue(this.your_churches.value);
    }
    //Makes sure the list is always set to what's in the Church Name box
    //If not, then is set to Other
    if(this.church_list.includes(this.your_church.value, 0)){
      this.your_churches.setValue(this.your_church.value);
    }
    if(this.your_churches.value == "" || this.your_churches.value == null){
      this.your_churches.setValue("Other");
    }
  }

  numDaysCheck(){
    var dates = this.attendeeForm.get('days').value;

    this.cost = 155;
    this.days_attending = "";

    if(dates[0]){
      this.days_attending += "Friday, ";
    }
    if(dates[1]){
      this.days_attending += "Saturday, ";
    }
    if(dates[2]){
      this.days_attending += "Sunday, ";
    }
    if(dates[3]){
      this.days_attending += "Monday";
    }
  }

  rebindDaysCheck(){
    this.attendeeForm.setControl('days', this.fb.array([
      this.currentAttendee.days_attending.includes("Friday"), 
      this.currentAttendee.days_attending.includes("Saturday"),
      this.currentAttendee.days_attending.includes("Sunday"),
      this.currentAttendee.days_attending.includes("Monday")
    ]));
  }

  //Scrolls to top of page after adding new attendee
  scroll() {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 40); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  //Binding
  //Updates the form's values with the contents from the list
  bindListToForm() {
    this.checkChurch();
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
    this.rebindDaysCheck();
  }

  //Helper buttons for testing
  fullUpdate() {
    this.attendeeForm.setValue({
      first_name: 'Partial', last_name: 'monkey', t_shirt: 'M', gender: 'Male',
      age: 12, medical: 'yes', address: '123 Adams Ave', address_2: "N/A", city: "Philadelphia",
      state: "PA", zip_code: "12312", email: "test@test.com", emergency_contact_first_name: "Test",
      emergency_contact_last_name: "Testest", emergency_contact_phone_number: "12312312", emergency_contact_relationship: "asdfasd",
      your_churches: "Other", your_church: "Bapist", your_church_point_of_contact_name: "asdafsdfasdfa", 
      your_church_point_of_contact_number: "1231231232", days: this.days_bool
    });
    this.addAttendee();
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
