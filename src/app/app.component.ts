import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

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
  }
  onSubmit(){
    console.log(this.registration_form.controls.info.value);
  }
}
