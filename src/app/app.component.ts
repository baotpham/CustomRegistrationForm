import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  registration_form = new FormGroup({
    'attendees': new FormArray([]),
    'info': new FormGroup({})
  });
  title = 'CVCF Youth Retreat 2018 Registration Form';



  constructor(private fb: FormBuilder){ }

  ngOnInit() {
    // this.registration_form = this.fb.group({
    //   attendees: FormArray,
    //   info: FormGroup
    // });
    // const control = <FormArray>this.registration_form.controls['attendees'];
    // const formthing = this.registration_form.controls.attendees;
    // control.push(formthing);

    
    // const control = <FormArray>this.registration_form.controls['attendees'];
    // control.push(new FormGroup({
    //   first_name : new FormControl("", Validators.required),
    //   last_name : new FormControl("", Validators.required),
    //   t_shirt : new FormControl("", Validators.required),
    //   gender : new FormControl("", Validators.required),
    //   age : new FormControl("", Validators.required),
    //   medical : new FormControl("", Validators.required)
    // }));
  }
  onSubmit(){
    console.log(this.registration_form.controls['attendees']);
  }
}
