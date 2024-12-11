import { inject, Injectable } from '@angular/core';
import { Adapter } from '../interface/adapter';
import { RequestNames } from '../enums/RequestNames';

@Injectable({
  providedIn: 'root',
})
export class APIAdapter implements Adapter {
  adapt(data: any | null, requestName: RequestNames) {
    let resObj;
    switch (requestName) {
      default:
        resObj = data;
    }
    return resObj;
  }
}
