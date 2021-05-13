import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userDetails } from './model/user-details.model';
import * as fromUsers from './reducers/users.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'payment-app';
  url = '';
  userDetails: userDetails[] = [];

  constructor(private router: Router, private store: Store<fromUsers.State>) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }

  ngOnInit() {
    const users$ = this.store.select(fromUsers.getUsers).subscribe((users:any) => {
      this.userDetails = users.userDetails;
      console.log(this.userDetails);
    });
  }
}
