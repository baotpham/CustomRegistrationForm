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

  // Card variables pertaining to Stripe
  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  // Generic variables
  registers: any;
  loading: boolean = false;
  email = '';

  // Cost calculation variables
  total_cost = 0;
  base_price = 155;
  original_cost = 0;
  new_cost = 165;
  cost_diff = 0;

  // Submit button disabled
  button_disabled = false;

  // Generic data object for incoming value from webtask.io
  dataObj: any;

  constructor(private cd: ChangeDetectorRef, private userService: UserService,
    private http: HttpClient, private googleService: GoogleService,
    private router: Router) { }

  ngOnInit() {
    // Get data from form registrations
    this.registers = this.userService.getAllRegisters();
    console.log("Registers: ", this.registers);

    // Scrolls to top of screen
    window.scrollTo(0, 0);

    // Calculates total for registers
    this.total_cost = this.registers.length * this.base_price;
    this.original_cost = this.registers.length * this.base_price;

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

    // Create Stripe card element
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
    // Disable button when submitting form to prevent multiple submissions
    this.button_disabled = true;

    // Attempt to create stripe token from card information
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      // Reenables the button to allow the user to resubmit
      console.log('Something is wrong:', error);
      this.button_disabled = false;
    } else {
      console.log('Success!');

      // If the cost is 0, due to some discount, automatically post to Google sheets
      // On success, charge the person and post to Google sheets
      if(this.new_cost==0){
        this.postToGoogle();
      }
      else{
      // Send the token to the your backend to process the charge
        this.processCharge(token).then(
          //Reenable post to Google functionality once updated
          //(success) => this.postToGoogle(),
          (success) => this.router.navigate(['/', 'thank-you']),
          (error) => console.error("Stripe process charge error", error)
        );

        // TODO: Figure out why postToGoogle is here twice, once from process charge success, and once here.
        // this.postToGoogle().then(
        //   (success) => this.processCharge(token).then(
        //     (success) => this.router.navigate(['/', 'thank-you']), //this needs to be moved to the onsuccess part of PostToGoogle
        //     (error) => console.error("Creating charge error", error)
        //   ),
        //   (error) => console.error("Posting to Google error", error)
        // );
      }

    }
  }

  // Processes charge through Webtask.io and Stripe
  processCharge(token) {
    var task_url = 'https://wt-0abace7df40ea939072b329aa74c0316-0.sandbox.auth0-extend.com/webtask-stripe-payment';

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

  // Monitor email value and set it here.
  onKey(value: string) {
    this.email = value;
  }

  // Post list of registers to Google Forms connected to Google Sheets
  postToGoogle() {
    console.log("posting to google: ", this.registers);
    this.loading = true;

    //Because passing 0 to Google doesn't work for some reason.
    if(this.new_cost == 0){
      this.new_cost = 1; 
    }

    //Fix cost for all registers
    for(var i in this.registers){
      this.registers[i].cost = this.new_cost;
    }

    //google sheet response is html, but for some reason, http tries to parse json.
    //this project will reject the html. I think it has to do with http header.
    let promise = new Promise((resolve, reject) => 
      this.googleService.post(this.registers).then(
        () => { this.loading = false },
        () => { this.loading = false })
    );
    
    return promise;
  }

  // Disables submit button after submit
  isDisabled(){
    return this.button_disabled;
  }

  // Updates registration cost based on discounts defined in Webtask.io
  checkDiscount(discount: string){
    var task_url = 'https://wt-0abace7df40ea939072b329aa74c0316-0.sandbox.auth0-extend.com/handle-discount';

    let promise = new Promise((resolve, reject) => {
      const command = {
        code: discount
      };

      this.http.post(task_url, command).subscribe(
        (data) => {
          this.dataObj = data;
          this.new_cost = this.dataObj.newCost;
          this.total_cost = this.dataObj.newCost * this.registers.length;
          this.original_cost = this.base_price * this.registers.length;
          this.cost_diff = this.original_cost - this.total_cost;
        },
        (error) => reject(error)
      );
    });
  }
}
