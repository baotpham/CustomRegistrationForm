import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyoupage',
  templateUrl: './thankyoupage.component.html',
  styleUrls: ['./thankyoupage.component.scss']
})
export class ThankyoupageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //scrolls to top of screen
    window.scrollTo(0, 0);
  }

}
