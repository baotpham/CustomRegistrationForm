import {
  Component, OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { NgForm } from '@angular/forms';

import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { GoogleService } from '../services/google-service.service';



@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})

export class ReviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  registers: any;

  loading: boolean = false;

  constructor(private cd: ChangeDetectorRef, private userService: UserService,
    private http: HttpClient, private googleService: GoogleService) { }

  ngOnInit() {
    //get data from form registrations
    this.registers = this.userService.getAllRegisters();
    console.log("Registers: ", this.registers);
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
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
      this.processCharge(token).then(
        (success) => this.postToGoogle(),
        (error) => console.error("Stripe process charge error", error)
      );


      // const charge = stripe.charges.create({
      //   amount: 200,
      //   currency: 'usd',
      //   description: 'Example charge',
      //   source: token,
      // });
    }
  }

  processCharge(token) {

    let promise = new Promise((resolve, reject) => {

      var task_url = 'https://wt-0abace7df40ea939072b329aa74c0316-0.sandbox.auth0-extend.com/webtask-stripe-payment';
      console.log(`Processing token: ${JSON.stringify(token)}`);

      const command = {
        amount: 200,
        currency: 'usd',
        description: 'Example charge',
        source: token
      };

      this.http.post(task_url, command).subscribe(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });

    return promise;
  }


  postToGoogle(){
    console.log("posting to google: ", this.registers);
    this.loading = true;

    //google sheet response is html, but for some reason, http tries to parse json.
    //this project will reject the html. I think it has to do with http header.
    this.googleService.post(this.registers).then(
      () => {this.loading = false},
      () => {this.loading = false});
  }

}
