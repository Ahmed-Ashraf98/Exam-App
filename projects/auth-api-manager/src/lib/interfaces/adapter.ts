import { RequestCategory } from '../enums/requestCategory';

export interface Adapter {
  adapt<T>(data: T, requestCategory: RequestCategory): T;
}
