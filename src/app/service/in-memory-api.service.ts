import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, STATUS, ResponseOptions } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryApiService implements InMemoryDbService {

  constructor() { }

  post(requestInfo: RequestInfo) {
      // Intercept POST calls to the 'somedatatype' collection:
      // E.g. add some fields to our entity that would be set in the backend,
      const data = requestInfo.utils.getJsonBody(requestInfo.req);
      // forge the response
      const options: ResponseOptions = {
        body: { ...data },
        status: STATUS.OK,
        headers: requestInfo.headers,
        url: requestInfo.url
      };

      // use createResponse$ to return proper response
      return requestInfo.utils.createResponse$(() => options);
  }

  createDb() {
    const userDetails = [
      { email: "abc@email.com", firstName: "Joe", lastName: "Raj", monthlyAdvertisingBudget: 789, phoneNumberCcv: 44 },
    ];

    return userDetails;
  }
}
