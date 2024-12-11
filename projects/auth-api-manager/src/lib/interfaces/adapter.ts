import { RequestTypes } from '../enums/RequestTypes';

export interface Adapter {
  adapt(data: any, requestCategory: RequestTypes): any;
}
