import { RequestCategory } from '../enums/requestCategory';

export interface Adapter {
  adapt(data: any, requestCategory: RequestCategory): any;
}
