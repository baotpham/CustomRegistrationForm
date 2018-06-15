import {
  Component, OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  EventEmitter, Output
} from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GoogleService } from '../services/google-service.service';



@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})

export class ReviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  @Output() completed = new EventEmitter<string>();

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  registers: any;

  loading: boolean = false;

  email = '';
  total_cost = 0;
  button_disabled = false;

  constructor(private cd: ChangeDetectorRef, private userService: UserService,
    private http: HttpClient, private googleService: GoogleService,
    private router: Router) { }

  ngOnInit() {
    //get data from form registrations
    this.registers = this.userService.getAllRegisters();
    console.log("Registers: ", this.registers);

    //scrolls to top of screen
    window.scrollTo(0, 0);

    //Calculates total for registers
    this.total_cost = this.registers.length * 155;

    // for(var i = 0; i<this.registers.length; i++){
    //   console.log("Old total is: " + this.total_cost);
    //   console.log("Adding " + this.registers[i].cost);
    //   this.total_cost += this.registers[i].cost;
    //   console.log("New total is: " + this.total_cost);
    // }
    // console.log(this.total_cost);

    this.button_disabled = false;
  }

  ngAfterViewInit() {
    const style = {
      base: {
        lineHeight: '24px',
        fontFamily: 'monospace',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
        '::placeholder': {
          color: 'purple'
        }
      }
    };

    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    this.button_disabled = true;
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
      this.button_disabled = false;
    } else {
      console.log('Success!');
      // ...send the token to the your backend to process the charge
      this.processCharge(token).then(
        (success) => this.postToGoogle(),
        (error) => console.error("Stripe process charge error", error)
      );

      this.router.navigate(['/', 'thank-you']);
    }
  }

  processCharge(token) {
    var task_url = 'https://wt-0abace7df40ea939072b329aa74c0316-0.sandbox.auth0-extend.com/webtask-stripe-payment';
    // var task_url = 'https://wt-0abace7df40ea939072b329aa74c0316-0.sandbox.auth0-extend.com/stripe-payment';


    let promise = new Promise((resolve, reject) => {
      const command = {
        amount: this.total_cost * 100,
        currency: 'usd',
        description: 'Registration cost for ' + this.email,
        source: token,
        receipt_email: this.email
      };

      this.http.post(task_url, command).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });

    return promise;
  }

  onKey(value: string) {
    this.email = value;
  }


  postToGoogle() {
    console.log("posting to google: ", this.registers);
    this.loading = true;

    //google sheet response is html, but for some reason, http tries to parse json.
    //this project will reject the html. I think it has to do with http header.
    this.googleService.post(this.registers).then(
      () => { this.loading = false },
      () => { this.loading = false });
  }
  isDisabled(){
    return this.button_disabled;
  }

}
