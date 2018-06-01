import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-form',
  templateUrl: './info-form.component.html',
  styleUrls: ['./info-form.component.scss']
})
export class InfoFormComponent implements OnInit {
  @Input() infoFormGroup: FormGroup;

  // Personal Contact
  // address_one = new FormControl("", Validators.required);
  // address_two = new FormControl("", Validators.required);
  // city = new FormControl("", Validators.required);
  // state = new FormControl("", Validators.required);
  // zip = new FormControl("", Validators.required);
  // email = new FormControl("", Validators.required);
  // church_name = new FormControl("", Validators.required);
  // church_poc_name = new FormControl("", Validators.required);
  // church_poc_num = new FormControl("", Validators.required);

  // Emergency Contact
  // ec_first_name = new FormControl("", Validators.required);
  // ec_last_name = new FormControl("", Validators.required);
  // ec_phone_num = new FormControl("", Validators.required);
  // ec_relationship = new FormControl("", Validators.required);


  constructor(fb: FormBuilder) {
    // this.infoFormGroup = fb.group({
    //   "address_one": this.address_one,
    //   "address_two": this.address_two,
    //   "city": this.city,
    //   "state": this.state,
    //   "zip": this.zip,
    //   "email": this.email,
    //   "church_name": this.church_name,
    //   "church_poc_name": this.church_poc_name,
    //   "church_poc_num": this.church_poc_num,

    //   "ec_first_name": this.ec_first_name,
    //   "ec_last_name": this.ec_last_name,
    //   "ec_phone_num": this.ec_phone_num,
    //   "ec_relationship": this.ec_relationship
    // });
  }

  ngOnInit() {
    this.infoFormGroup.addControl('address_one', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('address_two', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('city', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('state', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('zip', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('email', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('church_name', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('church_poc_name', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('church_poc_num', new FormControl("", Validators.required));

    this.infoFormGroup.addControl('ec_first_name', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('ec_last_name', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('ec_phone_num', new FormControl("", Validators.required));
    this.infoFormGroup.addControl('ec_relationship', new FormControl("", Validators.required));
  }

}
