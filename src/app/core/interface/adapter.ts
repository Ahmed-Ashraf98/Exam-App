import { RequestNames } from '../enums/RequestNames';

export interface Adapter {
  adapt(data: any | null, requestName: RequestNames): any;
}
