import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from './home.service';
import * as fromUsers from '../reducers/users.reducer';
import * as collection from '../actions/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30),
    Validators.pattern('^[a-zA-Z ]*$')]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.maxLength(120),
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    monthlyAdvertisingBudget: new FormControl('', [Validators.required]),
    phoneNumberCcv: new FormControl('44', [Validators.nullValidator]),
  });

  constructor(private homeService: HomeService, private toastr: ToastrService, private store: Store<fromUsers.State>) { }

  ngOnInit(): void {
  }


  getFormControlInstance(controlName: string) {
    return this.userGroup.controls[controlName];
  }

  submitForm() {
    if (this.validateForm()) {
      let formValue = this.userGroup.value;
      formValue = { ...formValue,
        monthlyAdvertisingBudget: parseInt(formValue.monthlyAdvertisingBudget),
        phoneNumberCcv: parseInt(formValue.phoneNumberCcv),
      };
      this.homeService.addUserDetail(formValue).subscribe(resp => {
        this.toastr.success('User Details added Successfully');
        const userDetail = resp;
        this.store.dispatch(new collection.AddUserAction(userDetail));
        this.userGroup.reset();
      }, err => {
        this.toastr.error('Failed to add User Details');
      });
    }
  }

  validateForm() {
    if (this.userGroup.invalid) {
      this.userGroup.controls.firstName.markAsTouched();
      this.userGroup.controls.lastName.markAsTouched();
      this.userGroup.controls.email.markAsTouched();
      this.userGroup.controls.monthlyAdvertisingBudget.markAsTouched();
      this.userGroup.controls.phoneNumberCcv.markAsTouched();
      return false;
    }
    return true;
  }
}
